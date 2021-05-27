import { AppService } from './components/services/app.service';
import { Component, OnInit } from '@angular/core';

// IMPORTACION DE ICONOS
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'coffe&cream';
  // ICONOS
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

  constructor(
    private appService: AppService,
    private router: Router,
  ){
    this.appService.cargarStorage();
  }

  ngOnInit() {}

  goTo(ruta: string){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/'+ ruta]);
  }

}

