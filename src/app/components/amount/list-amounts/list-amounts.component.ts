import { Component, OnInit } from '@angular/core';
import { Amount } from 'src/app/interfaces/amount';
import { AmountService } from 'src/app/services/amount.service';

@Component({
  selector: 'app-list-amounts',
  templateUrl: './list-amounts.component.html',
  styleUrls: ['./list-amounts.component.css']
})

export class ListAmountsComponent implements OnInit{

  listAmounts: Amount[]=[]


constructor(private _AmountService: AmountService) {}


ngOnInit(): void {
  this.getListAmounts()
}

getListAmounts(){
  this._AmountService.getListAmounts().subscribe((data)=>{
    console.log(data)
  })
}
}
