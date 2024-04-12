import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Client {
  idClientes: number;
  nombreCliente: string;
}

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  listClients: Client[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getListClients();
  }

  getListClients() {
    this.http.get<{ clientes: Client[] }>('http://localhost:8000/api/clientes/')
      .subscribe(
        response => {
          this.listClients = response.clientes;
        },
        error => {
          console.error('Error al obtener la lista de clientes:', error);
        }
      );
  }

  deleteClient(id: number) {
    this.http.delete(`http://localhost:8000/api/clientes/${id}`)
      .subscribe(
        () => {
          this.getListClients();
        },
        error => {
          console.error('Error al eliminar el cliente:', error);
        }
      );
  }
}
