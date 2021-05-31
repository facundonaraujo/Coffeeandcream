import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Meta, Title } from '@angular/platform-browser';

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
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
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

  // productDetail(productId): void{
  //   this.router.navigate(['/product', productId]);
  // }

  goTo(ruta: string){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/'+ ruta]);
  }
}
