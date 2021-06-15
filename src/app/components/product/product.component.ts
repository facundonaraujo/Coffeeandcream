import { Producto } from './../../models/producto.model';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

// IMPORT DE ICONOS
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // Iconos
  public faCheck = faCheck;
  public faShoppingBag = faShoppingBag;

  public product: Producto = new Producto();

  constructor(
    private productoService: ProductoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.product = this.productoService.producto;
  }

  agregarAlCarrito() {

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
