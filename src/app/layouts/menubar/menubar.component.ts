import { Ripple } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
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
  templateUrl: './menubar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  }
}
