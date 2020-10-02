import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

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
    private authSvc: AuthService,
    private router: Router,
    private cartService: CartService
  ) { }

  async ngOnInit(){

    await this.cartService.obtenerPedidosAdmin().subscribe((pedidosSnapshot) => {
      this.pedidos = [];
      pedidosSnapshot.forEach((pedidoData: any) => {
        this.pedidos.push({
          id: pedidoData.payload.doc.id,
          data: pedidoData.payload.doc.data()
        });
      });
      if (typeof this.pedidos !== undefined && this.pedidos.length > 0){
        this.noTienePedidos = false;
        this.showOrders = true;
        this.showOrderD = false;
        }else{
          this.noTienePedidos = true;
        }
      }).unsubscribe;
  }

  public async showOrderDetail(pedidoId){
    this.pedidoId = pedidoId;
    this.showOrders = false;
    this.showOrderD = true;
    await this.cartService.obtenerUnPedidoAdmin(pedidoId).subscribe((pedidoSnapshot) => {
      this.pedido = [];
      this.pedido.push({
          id: pedidoSnapshot.payload.id,
          data: pedidoSnapshot.payload.data()
        });
      this.pedido.forEach(p => {
        this.pedidoDetalle = [];
        p.data.orderDetail.forEach(pD => {
          this.pedidoDetalle.push({
            id: pD.id,
            data: pD.data
          });
        });
      });
  });
  }

  hideOrderDetail(){
    this.showOrders = true;
    this.showOrderD = false;
  }
}
