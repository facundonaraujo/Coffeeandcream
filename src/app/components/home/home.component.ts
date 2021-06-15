import { Producto } from 'src/app/models/producto.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Meta, Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faChevronRight = faChevronRight;
  public coffeesDay: Producto[] = [];

  customOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    autoWidth: false,
    lazyLoad: true,
    animateOut: 'slideOutDown',
    autoplay: true,
    loop: true,
    dots: false,
    navSpeed: 10,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  
  constructor(
    private productoService: ProductoService,
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.obtenerProductosEnOferta();
    this.titleService.setTitle('Coffee&Cream - Bienvenidos');
    this.meta.addTag({
      name: 'Coffee&Cream',
      content: 'Coffee&Cream'
    });
    this.meta.updateTag({
        name: 'description',
        content: 'Coffee&Cream es una empresa especializada en la obtención y preparación de los mejores cafés de Mendoza, Argentina.'
    });
  }

  obtenerProductosEnOferta(){
    this.productoService.obtenerProductosEnOfertaSinPaginar()
      .subscribe(
        (resp: any) =>{
          this.coffeesDay = resp.productos;
        },
        (err)=> {
          console.log('err :>> ', err);
        }
      );
  }

  goTo(ruta: string){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/'+ ruta]);
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
