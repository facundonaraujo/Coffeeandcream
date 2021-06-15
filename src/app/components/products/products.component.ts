import { PaginadorBusquedaTabla } from 'src/app/models/paginador.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from '../services/producto.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Productos
  public products = [];
  public selectedProduct: Producto
  public productosPaginador: PaginadorBusquedaTabla = new PaginadorBusquedaTabla();
  constructor(
    private productoService: ProductoService,
    private router: Router,
    private meta: Meta,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.titleService.setTitle('Coffee&Cream - Productos');
    this.meta.addTag({
      name: 'Coffee&Cream',
      content: 'Coffee&Cream'
    });
    this.meta.updateTag({
        name: 'description',
        content: 'Visita nuestra tienda y conoce más de nuestros glamurosos cafés y nuestras ofertas.'
    });
  }

  obtenerProductos(){
    this.productoService.obtenerProductosPublic(this.productosPaginador)
      .subscribe(
        (resp: any) =>{
          this.products = resp.productos;
          this.productosPaginador.totalElements = resp.total;
        },
        (err)=> {
          console.log('err :>> ', err);
        }
      );
  }

  setPage(event){
    this.productosPaginador.pageNumber = (event - 1);
    this.obtenerProductos();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  productDetail(productId): void{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/product', productId]);
  }
}
