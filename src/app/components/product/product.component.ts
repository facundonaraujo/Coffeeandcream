import { Producto } from './../../models/producto.model';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

// IMPORT DE ICONOS
import { faCheck, faShoppingBag, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Carrito } from 'src/app/models/cart.model';

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
    this.cartService.agregarItemCarrito(this.product);
    this.cartService.onAddElementToCart(true);
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
