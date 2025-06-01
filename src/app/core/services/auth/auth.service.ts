import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { LoginRequest } from '@app/shared/interfaces/auth/login';
import { LoginResponse } from '@app/shared/interfaces/auth/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7073/api/usuario/login';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL, credentials).pipe(
      tap((response) => {
        this.tokenStorage.setToken(response.token);
        console.log('📦 Token almacenado en TokenStorageService');
      })
    );
  }

  logout(): void {
    this.tokenStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.tokenStorage.isAuthenticated();
  }

getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
}
}
