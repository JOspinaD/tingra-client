import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '@app/shared/interfaces/auth/login';
import { LoginResponse } from '@app/shared/interfaces/auth/login-response';
import { Usuario } from '@app/shared/interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7073/api/usuario/login';
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser$: Observable<Usuario | null>;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private jwtHelper: JwtHelperService
  ) {
    const initialUser = this.getUserFromToken();
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL, credentials).pipe(
      tap((response) => {
        this.tokenStorage.setToken(response.token);
        const user = this.getUserFromToken();
        this.currentUserSubject.next(user);
        console.log('🔑 Token almacenado:', response.token);
        console.log('📦 Token almacenado en TokenStorageService');
      })
    );
  }

 private getUserFromToken(): Usuario | null {
  const token = this.tokenStorage.getToken();
  if (!token || this.jwtHelper.isTokenExpired(token)) return null;

  try {
    const decoded = this.jwtHelper.decodeToken(token);

    // Verificación más robusta de los campos del token
    if (!decoded) {
      console.error('Token decoding returned null/undefined');
      return null;
    }

    const usuario: Usuario = {
      id: decoded.id || decoded.sub || '',
      nombre: decoded.nombre || decoded.name || 'Usuario',
      correo: decoded.correo || decoded.email || '',
      hashContraseña: decoded.hashContraseña || '',
      direccion: decoded.direccion || '',
      telefono: decoded.telefono || '',
      isDeleted: decoded.isDeleted || false,
      createdAt: decoded.createdAt ? new Date(decoded.createdAt) : new Date(),
      updatedAt: decoded.updatedAt ? new Date(decoded.updatedAt) : new Date()
    };
    return usuario;
  } catch (e) {
    console.error('Error decoding token', e);
    this.tokenStorage.clear();
    return null;
  }
}

  logout(): void {
    this.tokenStorage.clear();
    this.currentUserSubject.next(null);
    console.log('🔑 Token eliminado y usuario deslogueado');
  }

  isLoggedIn(): boolean {
   return this.tokenStorage.isAuthenticated() && !!this.currentUserSubject.value;
  }

  getInitialUserValue(): Usuario | null {
  return this.currentUserSubject.getValue();
  }

  getInitial(): string {
    const user = this.currentUserSubject.getValue();
    return user?.nombre ? user.nombre.charAt(0).toUpperCase() : '?'
  }

getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
}
}
