import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`http://localhost:8000/api/plazos/${id}`);
  }

  savePayment(payment: Payment): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/plazos/', payment);
  }

  updatePayment(id: number, payment: Payment): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/plazos/${id}`, payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/plazos/${id}`);
  }
}