import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Amount } from '../interfaces/amount';

@Injectable({
  providedIn: 'root'
})
export class AmountService {
  private myAppUrl: string
  private myAPiUrl: string

  constructor(private http: HttpClient) { 

    this.myAppUrl = 'http://localhost:8000/'
    this.myAPiUrl = 'api/montos/'
  }
  getListAmounts(): Observable<Amount[]>{
    return this.http.get<Amount[]>(this.myAppUrl+this.myAPiUrl)

  }
}
