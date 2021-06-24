import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Aplicacion } from '../../models/aplicacion.model';
import { AppService } from '../services/app.service';
// IMPORTACION DE ICONOS
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // ICONOS
  faCartArrowDown = faCartArrowDown;
  faShoppingBag = faShoppingBag;
  faUser = faUserCircle;
  faTimes = faTimes;

  constructor(
    private router: Router,
    private appService: AppService,
  ){}

  ngOnInit() {}

  // Carrito
  public total() {
    // let total = 0;
    // this.carrito.forEach(p => total += p.data.productTotal);
    // return total;
  }

  // public removerItemCarrito(cartid){
  //   this.cartService.quitarProducto(this.userId, cartid);
  // }

  // MOSTRAR CARRITO Y LOGIN
  openCart(){
    // this.showCart = true;
  }

  cart(): void {
    // this.showCart = !this.showCart;
  }

  closeCart(): void {
    // this.showCart = false;
  }

  acount(): void {
    this.appService.crearSubcriber().subscribe(
      (data: Aplicacion) =>{
        if (data.usuario !== null && data.usuario !== undefined) {
          if (data.usuario?._id !== null && data.usuario?._id !== undefined && data.usuario?._id !== '') {
            if (data.usuario?.role === 'ADMIN_ROLE') {
              this.router.navigate(['/admin-panel']);
            } else {
              this.router.navigate(['/edit-profile']);
            }
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          this.router.navigate(['/login']);
        }
      },
    )
  }

  public async comprar(){

  }

}
