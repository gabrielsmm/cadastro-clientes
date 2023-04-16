import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findPage(page: number = 0, filter?: string, linesPerPage?: number, orderBy?: string, direction?: string): Observable<any>{
    let url = `${this.baseUrl}/clientes/page?page=${page}`;
    if (filter) url += `&filter=${filter}`;
    if (linesPerPage) url += `&linesPerPage=${linesPerPage}`;
    if (orderBy) url += `&linesPerPage=${orderBy}`;
    if (direction) url += `&linesPerPage=${direction}`;
    return this.http.get<any>(url);
  }

  delete(id: number): Observable<void>{
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<void>(url);
  }

}