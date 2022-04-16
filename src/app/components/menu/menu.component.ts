import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// IMPORTACION DE ICONOS
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/models/enums.model';
import { Carrito } from 'src/app/models/cart.model';
import { CartService } from '../services/cart.service';

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
  
  public carrito: Carrito[] = [];
  cartToggle: boolean = false;
  @Output('onCartToggle') onCartToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
  ){}

  ngOnInit() { 
    this.cartService.carrito.subscribe({
      next: resp => {
        if (resp !== undefined && resp !== null) {
          this.carrito = resp;
        }
      }
    });
  }

  cart(): void {
    this.cartToggle = !this.cartToggle;
    this.onCartToggle.emit(this.cartToggle);
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

}
