import { Component, model, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-home',
  imports: [
    CardModule,
    ButtonModule,
    CarouselModule,
    CarouselModule,
    TagModule,
    GalleriaModule,
  ],
  templateUrl: './home.component.html',
  styles: `
  .p-card .p-card-body {
      width: 100%;
      height: 100%;
    }`,
})
export class HomeComponent implements OnInit {
  images: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  constructor() {}
  ngOnInit(): void {
    this.images = [
      'assets/marcas.png',
      'assets/revolucion.png',
      'assets/tendencias.png',
      'assets/tintas.png'
    ];
  }
}
