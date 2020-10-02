import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('CooffeAndCream - Nosotros');
    this.meta.addTag({
      name: 'CooffeAndCream',
      content: 'CooffeAndCream'
    });
    this.meta.updateTag({
        name: 'description',
        content: 'Coffee&Cream es una empresa especializada en la obtención y preparación de los mejores cafés de Mendoza, Argentina.'
    });
  }

}
