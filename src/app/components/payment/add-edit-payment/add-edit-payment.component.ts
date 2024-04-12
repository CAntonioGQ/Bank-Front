import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/interfaces/payment';

@Component({
  selector: 'app-add-edit-payment',
  templateUrl: './add-edit-payment.component.html',
  styleUrls: ['./add-edit-payment.component.css']
})
export class AddEditPaymentComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder, private _paymentService: PaymentService, private router: Router, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      plazos: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getPayment(this.id);
    }
  }

  getPayment(id: number) {
    this.loading = true;
    this._paymentService.getPayment(id).subscribe((data: Payment) => {
      this.loading = false;
      this.form.setValue({
        plazos: data.plazos
      });
    });
  }

  addPayment() {
    const payment: Payment = {
      idPlazos: this.id,
      plazos: this.form.value.plazos
    };
    this.loading = true;
    if (this.id !== 0) {
      // Es editar
      this._paymentService.updatePayment(this.id, payment).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/plazos']);
      });
    } else {
      // Es agregar
      this._paymentService.savePayment(payment).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/plazos']);
      });
    }
  }
}