import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8000/api/prestamos';
  private clientesUrl = 'http://localhost:8000/api/clientes';
  private montosUrl = 'http://localhost:8000/api/montos';
  private plazosUrl = 'http://localhost:8000/api/plazos';

  constructor(private http: HttpClient) { }

  getLoan(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/`);
  }

  saveLoan(loan: Loan): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, loan);
  }

  updateLoan(id: number, loan: Loan): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, loan);
  }

  deleteLoan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.clientesUrl}`);
  }

  getMontos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.montosUrl}`);
  }

  getPlazos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.plazosUrl}`);
  }
}