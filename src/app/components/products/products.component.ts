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
  public products: Producto[] = [];
  public selectedProduct: Producto | any;
  public productosPaginador: PaginadorBusquedaTabla = new PaginadorBusquedaTabla();
  loading: boolean = false;

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
    this.loading = true;
    this.productoService.obtenerProductosPublic(this.productosPaginador)
      .subscribe(
        {
          next: (resp: any) => {
            this.loading = false;
            this.products = resp.productos;
            this.productosPaginador.totalElements = resp.total;
          },
          error: (err: any) => {
            this.loading = false;
            console.log('err :>> ', err);
          }
        }
      );
  }

  setPage(event: number){
    let last_paginador = {...this.productosPaginador}
    this.productosPaginador.pageNumber = (event - 1);
    if (this.productosPaginador.pageNumber > last_paginador.pageNumber) {
      this.productosPaginador.desde += 9;
    } else {
      this.productosPaginador.desde -= 9;
    }
    if (this.productosPaginador.desde < 0) {
      this.productosPaginador.desde = 0;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.obtenerProductos();
  }

  productDetail(productId: number | any): void{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/product', productId]);
  }
}
