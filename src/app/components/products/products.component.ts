import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Productos
  public products = [];
  public selectedProduct: Producto
  constructor(
    private firestoreService: AuthService,
    private router: Router,
    private meta: Meta,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('CooffeAndCream - Productos');
    this.meta.addTag({
      name: 'CooffeAndCream',
      content: 'CooffeAndCream'
    });
    this.meta.updateTag({
        name: 'description',
        content: 'Visita nuestra tienda y conoce más de nuestros glamurosos cafés y nuestras ofertas.'
    });
    // this.firestoreService.getProducts().subscribe((productsSnapshot) => {
    //   this.products = [];
    //   productsSnapshot.forEach((productData: any) => {
    //     this.products.push({
    //       id: productData.payload.doc.id,
    //       data: productData.payload.doc.data()
    //     });
    //   });
    // });
  }

  productDetail(productId): void{
    this.router.navigate(['/product', productId]);
  }
}
