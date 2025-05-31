import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
<<<<<<< HEAD:src/app/layouts/menubar/menubar.component.ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menubar',
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
    ButtonModule,
  ],
=======
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
>>>>>>> f68260fd34e14226bf17d8635f07c6d36b10d046:src/app/shared/components/menubar/menubar.component.ts
  templateUrl: './menubar.component.html',
  standalone: true,
  imports: [Menubar]
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] | undefined;
  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
<<<<<<< HEAD:src/app/layouts/menubar/menubar.component.ts
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.redirectToHome();
        }
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        command: () => {
          this.redirectToUsers();
        }
      }
    ];
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToUsers(){
    this.router.navigate(['/usuarios']);
=======
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
>>>>>>> f68260fd34e14226bf17d8635f07c6d36b10d046:src/app/shared/components/menubar/menubar.component.ts
  }
}
