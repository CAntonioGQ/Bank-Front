import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

interface Loan {
  id_rel: number;
  nombreCliente: string;
  montos: number;
  plazos: string;
  createdAt: string;
}

@Component({
  selector: 'app-amortization',
  templateUrl: './amortization.component.html',
  styleUrls: ['./amortization.component.css']
})
export class AmortizationComponent implements OnInit {
  selectedLoan: Loan | null = null;
  loading: boolean = false;
  plazofinal: number = 0;
  plazosArray: any[] = [];
  interes: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSelectedLoan();
  }

  getSelectedLoan() {
    const id_rel = this.route.snapshot.paramMap.get('id');
    if (id_rel !== null) {
      this.http.get<{ prestamo: Loan }>(`http://localhost:8000/api/prestamos/${id_rel}`)
        .subscribe(
          response => {
            this.selectedLoan = response.prestamo;
            // Calcular plazofinal después de obtener los datos del préstamo 
            if (this.selectedLoan && this.isNumber(+this.selectedLoan.plazos)) {
              this.plazofinal = this.selectedLoan.montos / +this.selectedLoan.plazos;
              // Calcular el interés después de obtener los datos del préstamo
              this.interes = this.selectedLoan.montos * 0.11;
              // Crear un array con la cantidad de elementos igual al número de plazos
              this.plazosArray = Array(+this.selectedLoan.plazos).fill(0).map((_, index) => {
                const fecha = moment(this.selectedLoan!.createdAt);
                fecha.add((index + 1) * 15, 'days');
                return fecha.format('DD/MM/YYYY');
              });
            }
          },
          error => {
            console.error('Error al obtener el préstamo:', error);
          }
        );
    }
  }

  isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}