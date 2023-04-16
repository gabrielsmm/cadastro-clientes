import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class GeocodingApiService {
    API_KEY: string;
    API_URL: string;

    constructor(private http: HttpClient) {
        this.API_KEY = 'YOUR_API_KEY'
        this.API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;
    }

    findFromAddress(estado?: string, cidade?: string, bairro?: string, logradouro?: string, complemento?: string, cep?: string): Observable<any> {
        let enderecoCompleto = [logradouro];

        if (estado) enderecoCompleto.push(estado);
        if (cidade) enderecoCompleto.push(cidade);
        if (bairro) enderecoCompleto.push(bairro);
        if (logradouro) enderecoCompleto.push(logradouro);
        if (complemento) enderecoCompleto.push(complemento);

        let url = `${this.API_URL}${enderecoCompleto.join(',')}`;

        return this.http.get(url).pipe(map(response => <any> response));
    }
}