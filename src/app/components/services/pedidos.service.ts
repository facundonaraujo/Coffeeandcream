import { Pedido } from './../../models/pedido.model';
import { PaginadorBusquedaTabla } from './../../models/paginador.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService implements Resolve<any> {
  routeParams: any;
  pedido: Pedido = new Pedido();

  constructor(
    public http: HttpClient,
  ) { }

  public crearPedido(pedido: Pedido){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/pedido';
    if (pedido._id) {
      url += '/' + pedido._id;
      return this.http.put(url, pedido, {headers});
    } else {
      return this.http.post(url, pedido, {headers});
    }
  }

  public obtenerPedidosCliente(paginador: PaginadorBusquedaTabla, id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/pedidos/' + id;
    return this.http.post(url, paginador, {headers});
  }

  public obtenerPedidosAdmin(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/pedidos/';
    return this.http.post(url, paginador, {headers});
  }

  public obtenerPedido(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/pedido/' + id;
    return this.http.get(url, {headers});
  }

  public eliminarPedido(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/pedido/' + id;
    return this.http.delete(url, {headers});
  }

  getPedido(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      });

      if ('new' === this.routeParams.id) {
        resolve(this.pedido = new Pedido());
      }else{
        this.http.get(environment.urlServices + '/pedido/' + this.routeParams.id, {headers})
        .subscribe({
          next: (response: any) => {
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
        this.getPedido(),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

}
