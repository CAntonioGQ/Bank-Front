import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amount } from '../interfaces/amount';

@Injectable({
  providedIn: 'root'
})
export class AmountService {

  constructor(private http: HttpClient) { }

  getAmount(id: number): Observable<Amount> {
    return this.http.get<Amount>(`http://localhost:8000/api/montos/${id}`);
  }

  saveAmount(amount: Amount): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/montos/', amount);
  }

  updateAmount(id: number, amount: Amount): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/montos/${id}`, amount);
  }

  deleteAmount(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/montos/${id}`);
  }
}
