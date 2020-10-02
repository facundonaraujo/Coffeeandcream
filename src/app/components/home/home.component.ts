import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faChevronRight = faChevronRight;

  public coffeesDay = [];

  constructor(
    private firestoreService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firestoreService.getCoffeesDay().subscribe((coffeesSnapshot) => {
      this.coffeesDay = [];
      coffeesSnapshot.forEach((coffeeData: any) => {
        this.coffeesDay.push({
          id: coffeeData.payload.doc.id,
          data: coffeeData.payload.doc.data()
        });
      });
    });
  }

  productDetail(productId): void{
    this.router.navigate(['/product', productId]);
  }
}
