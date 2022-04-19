import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/cart.model';
import { Pedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  // Orders
  public pedidos: Pedido[] = [];
  public noTienePedidos = true;
  public showOrders = false;
  public showOrderD = false;
  public pedido: Pedido | any;
  public pedidoId: any;
  public pedidoDetalle: Carrito[] = [];

  constructor(
    private router: Router,
  ) { }

  async ngOnInit(){}

  public showOrderDetail(id: number | any){

  }

  hideOrderDetail(){
    this.showOrders = true;
    this.showOrderD = false;
  }
}
