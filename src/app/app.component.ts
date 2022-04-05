import { AppService } from './components/services/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  component: string = '';
  component_class: string = '';

  constructor(
    private appService: AppService,
    private router: Router,
  ){
    this.appService.cargarStorage();
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
  }

}

