import { Producto } from './../../models/producto.model';
import { FileI } from './../../models/file.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PaginadorBusquedaTabla } from 'src/app/models/paginador.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Server } from "miragejs";
import { DEFAULT_PRODUCTS } from 'src/app/helpers/products';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements Resolve<any> {
  private filePath: any;
  routeParams: any;
  producto: Producto = new Producto();
  productos: Producto[] = localStorage.getItem('Productos') ? JSON.parse(localStorage.getItem('Productos')) : DEFAULT_PRODUCTS;

  constructor(
    public http: HttpClient,
    private storage: AngularFireStorage
  ) {

    let server = new Server({
      routes() {
        this.namespace = "api";

        this.post("/productosPublic/", (schema, {requestBody}) => {
          let body: PaginadorBusquedaTabla = JSON.parse(requestBody);
          let productos = schema.db.productos;
          let productos_aux = productos.slice(body.desde);
          let total = productos.length;
          return {
            productos: productos_aux.slice(0, body.numeroPorPagina),
            total: total
          };
        });

        this.get("/productosSinPaginar/", (schema) => {
          let productos = schema.db.productos;
          let total = productos.length;
          return {
            productos: productos,
            total: total
          };
        });

        this.get("/productosEnOfertaSinPaginar/", (schema) => {
          let productos = schema.db.productos;
          let total = productos.length;
          return {
            productos: productos.filter( producto => producto.isInOferta === true),
            total: total
          };
        });

        this.get("/producto/:id", (schema, {params}) => {
          return {
            producto: schema.db.productos.findBy({id: params.id})
          };
        });

        this.put("/producto/:id", (schema, {params, requestBody}) => {
          let body: Producto = JSON.parse(requestBody);
          let producto = schema.db.productos.update(params.id, body);
          localStorage.setItem('Productos', JSON.stringify(schema.db.productos));
          return {
            producto: producto
          };
        });

        this.post("/producto/", (schema, {requestBody}) => {
          let body: Producto = JSON.parse(requestBody);
          let producto = schema.db.productos.insert(body);
          localStorage.setItem('Productos', JSON.stringify(schema.db.productos));
          return {
            producto: producto
          };
        });

        this.delete("/producto/:id", (schema, {params}) => {
          let producto = schema.db.productos.remove({id: params.id});
          localStorage.setItem('Productos', JSON.stringify(schema.db.productos));
          return {
            producto: producto
          };
        });
      }
    });
    server.db.loadData({
      productos: this.productos
    });
    localStorage.setItem('Productos', JSON.stringify(this.productos));

  }

  public crearProducto(producto: Producto){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('Token'),
    });
    let url = '/api/producto';
    if (producto.id) {
      url += '/' + producto.id;
      return this.http.put(url, producto, {headers});
    } else {
      return this.http.post(url, producto, {headers});
    }
  }

  public obtenerProductosPublic(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = '/api/productosPublic/';
    return this.http.post(url, paginador, {headers});
  }

  public obtenerProductosSinPaginar(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token'),
    });
    let url = '/api/productosSinPaginar/';
    return this.http.get(url, {headers});
  }

  public obtenerProductosEnOfertaSinPaginar(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = '/api/productosEnOfertaSinPaginar/';
    return this.http.get(url, {headers});
  }

  public obtenerProducto(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token'),
    });
    let url = '/api/producto/' + id;
    return this.http.get(url, {headers});
  }

  public eliminarProducto(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token'),
    });
    let url = '/api/producto/' + id;
    return this.http.delete(url, {headers});
  }

  public uploadImage( image: FileI): Promise<any>{
    return new Promise((resolve, reject) => {
      this.filePath = `images/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            console.log('Producto Editado Con Img');
            return urlImage;
          });
        })
      ).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  getProducto(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if ('new' === this.routeParams.id) {
        resolve(this.producto = new Producto());
      }else{
        this.http.get('/api/producto/' + this.routeParams.id, {headers})
        .subscribe({
          next: (response: any) => {
            this.producto = response.producto;
            resolve(response);
          },
          error: (err) => {
            reject(err);
          }
        });
      }
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise<void>((resolve, reject) => {
      Promise.all([
        this.getProducto(),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

}
