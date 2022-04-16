import { Producto } from './../../models/producto.model';
import { FileI } from './../../models/file.model';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PaginadorBusquedaTabla } from 'src/app/models/paginador.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements Resolve<any> {
  private filePath: any;
  routeParams: any;
  producto: Producto = new Producto();

  constructor(
    private serverService: ServerService,
    private storage: AngularFireStorage
  ) {}

  public crearProducto(producto: Producto){
    return this.serverService.crearProducto(producto);
  }

  public obtenerProductosPublic(paginador: PaginadorBusquedaTabla){
    return this.serverService.obtenerProductosPublic(paginador);
  }

  public obtenerProductosSinPaginar(){
    return this.serverService.obtenerProductosSinPaginar();
  }

  public obtenerProductosEnOfertaSinPaginar(){
    return this.serverService.obtenerProductosEnOfertaSinPaginar();
  }

  public obtenerProducto(id: number){
    return this.serverService.obtenerProducto(id);
  }

  public eliminarProducto(id: number){
    return this.serverService.eliminarProducto(id);
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

  public getProducto(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ('new' === this.routeParams.id) {
        resolve(this.producto = new Producto());
      }else{
        this.serverService.getProducto(this.routeParams.id)
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
