import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidaCepService {

  baseUrl: string = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  validarCep(cep: string): Observable<any> {
    const url = `${this.baseUrl}/${cep}/json/`;
    return this.http.get(url);
  }

}