import { Producto } from './../../models/producto.model';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Carrito } from 'src/app/models/cart.model';

// IMPORT DE ICONOS
import { faCheck, faShoppingBag, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // Iconos
  public faCheck = faCheck;
  public faShoppingBag = faShoppingBag;
  public faPlus = faPlus;
  public faMinus = faMinus;

  public product: Producto | any;
  public carrito: Carrito[] = [];
  public estaEnCarrito: boolean = false;
  public cantidad: number = 1;
  
  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.product = this.productoService.producto;
    this.cartService.carrito.subscribe({
      next: resp => {
        if (resp !== undefined && resp !== null) {
          this.carrito = resp;
          let i = this.carrito.findIndex(prod => prod.producto.id === this.product?.id);
          if (i > -1) {
            this.cantidad = this.carrito[i].cantidad;
            this.estaEnCarrito = true;
          }else{
            this.estaEnCarrito = false;
          }
        }
      }
    });
  }

  public agregarAlCarrito() {
    if (this.authService.estaLogueado()) {
      this.cartService.agregarItemCarrito(this.product);
      this.cartService.onAddElementToCart(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Inicia sesión para poder agregar productos al carrito.',
        showConfirmButton: true,
        confirmButtonText: 'Iniciar Sesión',
        confirmButtonAriaLabel: 'Iniciar Sesión',
        confirmButtonColor: '#FA9D33',
      }).then(
        (resp: any) => {
          if (resp.isConfirmed)
            this.router.navigate(['/login'])
        }
      );
    }
  }

  public removerItemCarrito(){
    this.cartService.removerItemCarrito(this.product);
  }

  public agregarItemCarrito(){
    this.cartService.agregarItemCarrito(this.product);
  }

  goToProducts(){
    window.scroll({
      top: 0,
      left: 0,
      // behavior: 'smooth',
    });
    this.router.navigate(['/products']);
  }

}
