import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@app/shared/interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API_URL = 'https://localhost:7073/api/usuario';
  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  getById(id: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/${id}`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API_URL, usuario);
  }

  update(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${id}`, usuario);
  }

  delete(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.API_URL}/${id}`);
  }
}
