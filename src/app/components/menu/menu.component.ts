import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// IMPORTACION DE ICONOS
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/models/enums.model';

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
    private authService: AuthService,
  ){}

  ngOnInit() { }

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

  account(): void {
    if (this.authService.estaLogueado()) {
      const usuario = this.authService.getCurrentUser();
      if (usuario.role === Role.ADMIN) {
        this.router.navigate(['/admin-panel']);
      } else {
        this.router.navigate(['/edit-profile']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  public async comprar(){

  }

}
