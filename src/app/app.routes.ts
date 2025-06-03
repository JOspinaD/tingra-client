import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'empresas',
    component: EmpresasComponent
  }
];
