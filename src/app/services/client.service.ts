import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`http://localhost:8000/api/clientes/${id}`);
  }

  saveClient(client: Client): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/clientes/', client);
  }

  updateClient(id: number, client: Client): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/clientes/${id}`, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/clientes/${id}`);
  }
}