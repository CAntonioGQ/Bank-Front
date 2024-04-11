import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http:HttpClient) { 
    this.myAppUrl = 'http://localhost:8000/'
    this.myApiUrl = 'api/clientes/'
  }


  getListClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.myAppUrl + this.myApiUrl)
  }
}
