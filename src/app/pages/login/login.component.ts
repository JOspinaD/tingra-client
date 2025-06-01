import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    CardModule
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required]],
  });

  loading = false;
  errorMessage = '';

  async onSubmit(): Promise<void> {
  if (this.loginForm.invalid) return;

  this.loading = true;
  this.errorMessage = '';

  const { correo, contraseña } = this.loginForm.value;

  // ✅ Convertimos Observable en Promise para usar await
  try {
    const response = await this.authService.login({ correo: correo!, contraseña: contraseña! }).toPromise();

    if (response && response.token) {
      console.log('✅ Login exitoso. Token recibido:', response.token);
      // Puedes guardar aquí algún log de usuario si hace falta
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'No se recibió un token válido del servidor.';
    }
  } catch (error) {
    console.error('❌ Error en login:', error);
    this.errorMessage = 'Credenciales incorrectas o error de servidor.';
  } finally {
    this.loading = false;
  }
}

}
