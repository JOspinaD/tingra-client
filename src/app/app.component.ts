import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
//import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layouts/footer/footer.component';
import { MenubarComponent } from './layouts/menubar/menubar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FooterComponent, MenubarComponent, ToastModule],
  //providers: [MessageService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tingra-client';
}
