import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CardModule,
    ButtonModule,
    CarouselModule,
    TagModule,
    GalleriaModule,
  ],
})
<<<<<<< HEAD:src/app/pages/home/home.component.ts
export class HomeComponent  {

   images = [
=======
export class HomeComponent implements OnInit {
  images: string[] = [];

  products = [
>>>>>>> f68260fd34e14226bf17d8635f07c6d36b10d046:src/app/features/components/home/home.component.ts
    { name: 'Marcas', image: 'marcas.png', price: 100 },
    { name: 'Revolucion', image: 'revolucion.png', price: 200 },
    { name: 'Tendencias', image: 'tendencias.png', price: 300 },
    { name: 'Tendencias', image: 'tendencias2.png', price: 250 },
    { name: 'Tintas', image: 'tintas.png', price: 150 }
<<<<<<< HEAD:src/app/pages/home/home.component.ts
  ];
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

=======
  ];

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 3 },
    { breakpoint: '992px', numVisible: 2, numScroll: 2 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 },
  ];

  responsiveProductOptions = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 },
  ];

  ngOnInit(): void {
    this.images = [
      'assets/marcas.png',
      'assets/revolucion.png',
      'assets/tendencias.png',
      'assets/tintas.png'
    ];
  }
>>>>>>> f68260fd34e14226bf17d8635f07c6d36b10d046:src/app/features/components/home/home.component.ts
}
