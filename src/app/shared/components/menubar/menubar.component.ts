import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  standalone: true,
  imports: [Menubar]
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home'
      },
      {
        label: 'Destacados',
        icon: 'pi pi-star'
      },
      {
        label: 'Proyectos',
        icon: 'pi pi-search',
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope',
        url: 'https://www.instagram.com/tendencias_graficas',
        target: '_blank'
      }
    ];
  }
}
