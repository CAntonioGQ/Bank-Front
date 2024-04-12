import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.css']
})
export class AddEditClientComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder, private _clientService: ClientService, private router: Router, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getClient(this.id);
    }
  }

  getClient(id: number) {
    this.loading = true;
    this._clientService.getClient(id).subscribe((data: Client) => {
      this.loading = false;
      this.form.setValue({
        nombre: data.nombreCliente
      });
    });
  }

  addClient() {
    const client: Client = {
      idClientes: this.id,
      nombreCliente: this.form.value.nombre
    };
    this.loading = true;
    if (this.id !== 0) {
      // Es editar
      this._clientService.updateClient(this.id, client).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/clientes']);
      });
    } else {
      // Es agregar
      this._clientService.saveClient(client).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/clientes']);
      });
    }
  }
}