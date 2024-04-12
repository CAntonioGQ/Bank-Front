import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLoansComponent } from './components/loan/list-loans/list-loans.component';
import { AddEditLoanComponent } from './components/loan/add-edit-loan/add-edit-loan.component';
import { AddEditClientComponent } from './components/client/add-edit-client/add-edit-client.component';
import { ListPaymentComponent } from './components/payment/list-payment/list-payment.component';
import { AddEditPaymentComponent } from './components/payment/add-edit-payment/add-edit-payment.component';
import { ListAmountsComponent } from './components/amount/list-amounts/list-amounts.component';
import { AddEditAmountComponent } from './components/amount/add-edit-amount/add-edit-amount.component';
import { ListClientComponent } from './components/client/list-client/list-client.component';

const routes: Routes = [
  { path: '', component: ListLoansComponent },
  { path: 'add', component: AddEditLoanComponent },
  { path: 'edit/:id', component: AddEditLoanComponent },
  { path: 'clientes', component: ListClientComponent },
  { path: 'addCliente', component: AddEditClientComponent },
  { path: 'editCliente/:id', component: AddEditClientComponent }, // Agrega ':id' aquí
  { path: 'plazos', component: ListPaymentComponent },
  { path: 'addPlazos', component: AddEditPaymentComponent },
  { path: 'editPlazos/:id', component: AddEditPaymentComponent }, // Agrega ':id' aquí
  { path: 'montos', component: ListAmountsComponent },
  { path: 'addMontos', component: AddEditAmountComponent },
  { path: 'editMontos/:id', component: AddEditAmountComponent }, // Agrega ':id' aquí
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
