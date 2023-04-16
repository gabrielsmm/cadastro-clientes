import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  create(cliente: Cliente): Observable<Cliente>{
    const url = `${this.baseUrl}/clientes`;
    return this.http.post<Cliente>(url, cliente);
  }

  find(id: any): Observable<Cliente>{
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get<Cliente>(url);
  }

  update(cliente: Cliente): Observable<void>{
    const url = `${this.baseUrl}/clientes/${cliente.id}`;
    return this.http.put<void>(url, cliente);
  }

}