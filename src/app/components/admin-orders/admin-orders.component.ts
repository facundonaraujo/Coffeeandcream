import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  // Orders
  public pedidos = [];
  public userLog: string;
  public userId: string;
  public noTienePedidos = true;
  public showOrders = false;
  public showOrderD = false;
  public pedido = [];
  public pedidoId: any;
  public pedidoDetalle = [];

  constructor(
    private router: Router,
  ) { }

  async ngOnInit(){}

  public showOrderDetail(pedidoId){

  }

  hideOrderDetail(){
    this.showOrders = true;
    this.showOrderD = false;
  }
}
