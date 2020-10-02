import { Product } from './../shared/models/product.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Productos
  public products = [];
  public selectedProduct: Product
  constructor(private firestoreService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((productData: any) => {
        this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
      });
    });
  }
  productDetail(productId): void{
    this.router.navigate(['/product', productId]);
  }
}
