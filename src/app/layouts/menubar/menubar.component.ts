import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-menubar',
  imports: [MenubarModule, CommonModule, ButtonModule, AvatarModule],
  templateUrl: './menubar.component.html',
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] | undefined;
  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.redirectToHome();
        },
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        command: () => {
          this.redirectToUsers();
        },
      },
    ];
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToUsers() {
    this.router.navigate(['/usuarios']);
  }
}
