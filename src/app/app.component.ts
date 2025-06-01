import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from './layouts/menubar/menubar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,  MenubarComponent, ToastModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tingra-client';
}
