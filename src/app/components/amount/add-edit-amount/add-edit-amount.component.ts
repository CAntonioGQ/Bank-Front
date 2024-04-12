import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AmountService } from 'src/app/services/amount.service';
import { Amount } from 'src/app/interfaces/amount';

@Component({
  selector: 'app-add-edit-amount',
  templateUrl: './add-edit-amount.component.html',
  styleUrls: ['./add-edit-amount.component.css']
})
export class AddEditAmountComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _amountService: AmountService,
    private router: Router,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      montos: ['', Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id !== 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getAmount(this.id);
    }
  }

  getAmount(id: number) {
    this.loading = true;
    this._amountService.getAmount(id).subscribe((data: Amount) => {
      this.loading = false;
      this.form.setValue({
        montos: data.montos
      })
    })
  }

  addAmount() {
    const amount: Amount = {
      idMontos: this.id,
      montos: this.form.value.montos
    };
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      this._amountService.updateAmount(this.id, amount).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/montos']);
      });

    } else {
      // Es agregar
      this._amountService.saveAmount(amount).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/montos']);
      });
    }
  }
}
