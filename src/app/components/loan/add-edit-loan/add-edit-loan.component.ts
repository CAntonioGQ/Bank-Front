import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/interfaces/loan';

@Component({
  selector: 'app-add-edit-loan',
  templateUrl: './add-edit-loan.component.html',
  styleUrls: ['./add-edit-loan.component.css']
})
export class AddEditLoanComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  clientes: any[] = [];
  montos: any[] = [];
  plazos: any[] = [];

  constructor(private fb: FormBuilder, private _loanService: LoanService, private router: Router) {
    this.form = this.fb.group({
      nombreCliente: ['', Validators.required],
      monto: ['', Validators.required],
      plazo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    this.loadMontos();
    this.loadPlazos();
  }

  loadClientes() {
    this._loanService.getClientes().subscribe(
      (response: any) => {
        this.clientes = response.clientes; // Acceder al array 'clientes' dentro de la respuesta
      },
      (error: any) => {
        console.error('Error al obtener la lista de clientes:', error);
      }
    );
  }

  loadMontos() {
    this._loanService.getMontos().subscribe(
      (response: any) => {
        this.montos = response.montos; // Acceder al array 'montos' dentro de la respuesta
      },
      (error: any) => {
        console.error('Error al obtener la lista de montos:', error);
      }
    );
  }

  loadPlazos() {
    this._loanService.getPlazos().subscribe(
      (response: any) => {
        this.plazos = response.plazos; // Acceder al array 'plazos' dentro de la respuesta
      },
      (error: any) => {
        console.error('Error al obtener la lista de plazos:', error);
      }
    );
  }

  addLoan() {
    const loan: any = {
      nombreCliente: this.form.value.nombreCliente,
      montos: this.form.value.monto,
      plazos: this.form.value.plazo
    };

    this.loading = true;
    this._loanService.saveLoan(loan).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/prestamos']);
      },
      (error) => {
        this.loading = false;
        console.error('Error al crear el préstamo:', error);
        // Manejo de errores en caso de que la solicitud falle
      }
    );
  }
}