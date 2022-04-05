import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// IMPORTACION DE ICONOS
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // ICONOS
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goTo(ruta: string){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/'+ ruta]);
  }

}
