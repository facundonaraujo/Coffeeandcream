import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartService } from './components/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  component: string = '';
  component_class: string = '';
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;

  constructor(
    private router: Router,
    private cartService: CartService,
  ){
    if (this.router.url.includes('/home')) {
      this.component = 'home';
      this.component_class = '';
    }else{
      this.component = '';
      this.component_class = 'inner';
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (this.router.url.includes('/home')) {
        this.component = 'home';
        this.component_class = '';
      }else{
        this.component = '';
        this.component_class = 'inner';
      }
    });
    this.cartService.addElementToCart$.subscribe({
      next: resp => {
        if (resp !== undefined && resp !== null) {
          this.onCartOpen(resp);
        }
      }
    });
  }

  onCartToggle(event){
    this.drawer.toggle();
  }

  onCartClose(event){
    this.drawer.close();
  }

  onCartOpen(event){
    this.drawer.open();
  }

}

