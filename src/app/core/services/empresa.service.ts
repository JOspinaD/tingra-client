import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '@app/shared/interfaces/empresa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private readonly API_URL = 'https://localhost:7073/api/empresa';
  constructor(private http: HttpClient) {}

  getAllEmpresas(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.API_URL);
  }

  getById(id: string): Observable<Empresa>{
    return this.http.get<Empresa>(`${this.API_URL}/${id}`);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(this.API_URL, empresa);
  }

  updateEmpresa(id: string, empresa: Empresa): Observable<Empresa>{
    return this.http.put<Empresa>(`${this.API_URL}/${id}`, empresa);
  }

  deleteEmpresa(id: string): Observable<Empresa>{
    return this.http.delete<Empresa>(`${this.API_URL}/${id}`);
  }
}
