import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Loan {
  id_rel: number;
  nombreCliente: string;
  montos: number;
  plazos: string;
}

@Component({
  selector: 'app-list-loans',
  templateUrl: './list-loans.component.html',
  styleUrls: ['./list-loans.component.css']
})
export class ListLoansComponent implements OnInit {
  listLoans: Loan[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getListLoans();
  }

  getListLoans() {
    this.http.get<{ prestamos: Loan[] }>('http://localhost:8000/api/prestamos/')
      .subscribe(
        response => {
          this.listLoans = response.prestamos;
        },
        error => {
          console.error('Error al obtener la lista de préstamos:', error);
        }
      );
  }

  deleteLoan(id: number) {
    this.http.delete(`http://localhost:8000/api/prestamos/${id}`)
      .subscribe(
        () => {
          this.getListLoans();
        },
        error => {
          console.error('Error al eliminar el préstamo:', error);
        }
      );
  }

  goToAmortization(id: number) {
    this.router.navigate(['/amortizacion', id]);
  }
}