import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  userEmail: string = '';
  isDialogVisible: boolean = false;

  showLoginDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
    this.email = '';
    this.password = '';
  }

  login() {
    if (this.email && this.password) {
      this.isLoggedIn = true;
      this.userEmail = this.email;
      this.email = '';
      this.password = '';
      this.closeDialog();
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.userEmail = '';
  }
}