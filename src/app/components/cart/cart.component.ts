import { Producto } from './../../models/producto.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Carrito } from '../../models/cart.model'
import { CartService } from '../services/cart.service';

// ICONOS
import { faShoppingBag, faTrash, faAngleLeft, faAngleRight, faCheck, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output('onCartClose') onCartClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Iconos
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faCheck = faCheck;
  faTimes = faTimes;
  faShoppingBag = faShoppingBag;

  // Cart
  public carrito: Carrito[] = [];

  constructor(
    private cartService: CartService,
  ) {}

  async ngOnInit() { 
    this.cartService.carrito.subscribe({
      next: resp => {
        if (resp !== undefined && resp !== null) {
          this.carrito = resp;
        }
      }
    });
  }

  public subtotal() {
    let subtotal = 0;
    this.carrito.forEach(p => subtotal += (p.producto.precio * p.cantidad));
    return subtotal;
  }

  public removerItemCarrito(producto: Producto){
    this.cartService.removerItemCarrito(producto);
  }

  public removerProductoCarrito(producto: Producto){
    this.cartService.removerProductoCarrito(producto);
  }

  public agregarItemCarrito(producto: Producto){
    this.cartService.agregarItemCarrito(producto);
  }

  public vaciarCarrito(){
    this.cartService.vaciarCarrito();
  }

  public goToCheckout(){

  }

}
