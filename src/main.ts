import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { HomeComponent } from './app/pages/home/home.component';
import { FooterComponent } from './app/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HomeComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="main-content">
      <app-home></app-home>
    </main>
    <app-footer></app-footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
    `,
  ],
})
export class App {}

bootstrapApplication(App);
