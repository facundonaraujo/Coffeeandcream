import { Pedido } from './../../models/pedido.model';
import { PaginadorBusquedaTabla } from './../../models/paginador.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService implements Resolve<any> {
  routeParams: any;
  pedido: Pedido = new Pedido();

  constructor(
    private serverService: ServerService,
  ) {}

  public crearPedido(pedido: Pedido){
    return this.serverService.crearPedido(pedido);
  }

  public obtenerPedidosCliente(paginador: PaginadorBusquedaTabla, id: number){
    return this.serverService.obtenerPedidosCliente(paginador, id);
  }

  public obtenerPedidosAdmin(paginador: PaginadorBusquedaTabla){
    return this.serverService.obtenerPedidosAdmin(paginador);
  }

  public obtenerPedido(id: number){
    return this.serverService.obtenerPedido(id);
  }

  public eliminarPedido(id: number){
    return this.serverService.eliminarPedido(id);
  }

  public getPedido(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ('new' === this.routeParams.id) {
        resolve(this.pedido = new Pedido());
      }else{
        this.serverService.getPedido(this.routeParams.id)
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
