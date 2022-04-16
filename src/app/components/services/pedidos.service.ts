import { Pedido } from './../../models/pedido.model';
import { PaginadorBusquedaTabla } from './../../models/paginador.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Server } from "miragejs";
import { DEFAULT_ORDERS } from './../../helpers/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService implements Resolve<any> {
  routeParams: any;
  pedido: Pedido = new Pedido();
  pedidos: Pedido[] = localStorage.getItem('Pedidos') ? JSON.parse(localStorage.getItem('Pedidos')) : DEFAULT_ORDERS;

  constructor(
    public http: HttpClient,
  ) { 

    let server = new Server({
      routes() {
        this.namespace = "api";

        this.put("/pedido/:id", (schema, {params, requestBody}) => {
          let body: Pedido = JSON.parse(requestBody);
          let pedido = schema.db.pedidos.update(params.id, body);
          localStorage.setItem('Pedidos', JSON.stringify(schema.db.pedidos));
          return {
            pedido: pedido
          };
        });

        this.post("/pedido/", (schema, {requestBody}) => {
          let body: Pedido = JSON.parse(requestBody);
          let pedido = schema.db.pedidos.insert(body);
          localStorage.setItem('Pedidos', JSON.stringify(schema.db.pedidos));
          return {
            pedido: pedido
          };
        });

        this.post("/pedidos/:id", (schema, {params, requestBody}) => {
          let body: PaginadorBusquedaTabla = JSON.parse(requestBody);
          let pedidos = schema.db.pedidos;
          if (params.id) {
            pedidos.filter(pedido => pedido.cliente.id === params.id);
          }
          let pedidos_aux = pedidos.slice(body.desde);
          let total = pedidos.length;
          return {
            pedidos: pedidos_aux.slice(0, body.numeroPorPagina),
            total: total
          };
        });

        this.get("/pedido/:id", (schema, {params}) => {
          return {
            pedido: schema.db.pedidos.findBy({id: params.id})
          };
        });

        this.delete("/pedido/:id", (schema, {params}) => {
          let pedido = schema.db.pedidos.remove({id: params.id});
          localStorage.setItem('Pedidos', JSON.stringify(schema.db.pedidos));
          return {
            pedido: pedido
          };
        });
      }
    });
    server.db.loadData({
      pedidos: this.pedidos
    });
    localStorage.setItem('Pedidos', JSON.stringify(this.pedidos));

  }

  public crearPedido(pedido: Pedido){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token'),
    });
    let url = '/api/pedido';
    if (pedido.id) {
      url += '/' + pedido.id;
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
    let url = '/api/pedidos/' + id;
    return this.http.post(url, paginador, {headers});
  }

  public obtenerPedidosAdmin(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = '/api/pedidos/';
    return this.http.post(url, paginador, {headers});
  }

  public obtenerPedido(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = '/api/pedido/' + id;
    return this.http.get(url, {headers});
  }

  public eliminarPedido(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = '/api/pedido/' + id;
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
        this.http.get('/api/pedido/' + this.routeParams.id, {headers})
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
