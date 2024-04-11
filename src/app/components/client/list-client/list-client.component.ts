import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  listClients: Client[] = [];
  loading: boolean = false;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getListClients();
  }

  getListClients() {
    this.loading = true;
    this.clientService.getListClients().subscribe(
      clients => {
        this.listClients = clients; // Asignamos directamente el array de clientes
        this.loading = false;
      },
      error => {
        console.error('Error al obtener la lista de clientes:', error);
        this.loading = false;
      }
    );
  }
}
