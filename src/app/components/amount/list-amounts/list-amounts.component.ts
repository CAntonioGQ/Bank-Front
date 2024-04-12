import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Amount {
  idMontos: number;
  montos: number;
}

@Component({
  selector: 'app-list-amounts',
  templateUrl: './list-amounts.component.html',
  styleUrls: ['./list-amounts.component.css']
})
export class ListAmountsComponent implements OnInit {
  amounts: Amount[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAmounts();
  }

  getAmounts() {
    this.http.get<{ montos: Amount[] }>('http://localhost:8000/api/montos/')
      .subscribe(
        response => {
          this.amounts = response.montos;
        },
        error => {
          console.error('Error al obtener la lista de montos:', error);
        }
      );
  }

  deleteAmount(id: number) {
    this.http.delete(`http://localhost:8000/api/montos/${id}`)
      .subscribe(
        () => {
          this.getAmounts();
        },
        error => {
          console.error('Error al eliminar el monto:', error);
        }
      );
  }
}
