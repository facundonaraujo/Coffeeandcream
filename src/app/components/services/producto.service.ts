import { Producto } from './../../models/producto.model';
import { FileI } from './../../models/file.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginadorBusquedaTabla } from 'src/app/models/paginador.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements Resolve<any> {
  private filePath: any;
  public actualProduct: any;
  routeParams: any;
  producto: Producto = new Producto();

  constructor(
    public http: HttpClient,
    private storage: AngularFireStorage
  ) { }

  public crearProducto(producto: Producto){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/producto';
    if (producto._id) {
      url += '/' + producto._id;
      return this.http.put(url, producto, {headers});
    } else {
      return this.http.post(url, producto, {headers});
    }
  }

  public obtenerProductosPublic(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = environment.urlServices + '/productosPublic/';
    return this.http.post(url, paginador, {headers});
  }

  public obtenerProductosPaginados(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/productosPaginados/';
    return this.http.post(url, paginador, {headers});
  }

  public obtenerProductosSinPaginar(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/productosSinPaginar/';
    return this.http.get(url, {headers});
  }

  public obtenerProductosEnOfertaSinPaginar(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = environment.urlServices + '/productosEnOfertaSinPaginar/';
    return this.http.get(url, {headers});
  }

  public obtenerProductoPublic(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = environment.urlServices + '/productoPublic/' + id;
    return this.http.get(url, {headers});
  }

  public obtenerProducto(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/producto/' + id;
    return this.http.get(url, {headers});
  }

  public eliminarProducto(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/producto/' + id;
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
        this.http.get(environment.urlServices + '/productoPublic/' + this.routeParams.id, {headers})
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
