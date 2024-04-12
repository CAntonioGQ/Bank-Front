import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Payment {
  idPlazos: number;
  plazos: string;
}

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPayments();
  }

  getPayments() {
    this.http.get<{ plazos: Payment[] }>('http://localhost:8000/api/plazos/')
      .subscribe(
        response => {
          this.payments = response.plazos;
        },
        error => {
          console.error('Error al obtener la lista de plazos:', error);
        }
      );
  }

  deletePayment(id: number) {
    this.http.delete(`http://localhost:8000/api/plazos/${id}`)
      .subscribe(
        () => {
          this.getPayments();
        },
        error => {
          console.error('Error al eliminar el plazo:', error);
        }
      );
  }
}
