import { logging } from 'protractor';
import { CalcinssService } from '../../services/calc-inss/calcinss.service';
import { InssTable } from '../../models/calc-inss/insstable.model';
import { Component, OnInit } from '@angular/core';
import { ASTWithSource } from '@angular/compiler';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { truncateDecimals } from '../../shared/functions';

@Component({
  selector: 'app-calc-inss',
  templateUrl: './calc-inss.component.html',
  styleUrls: ['./calc-inss.component.scss']
})
export class CalcInssComponent implements OnInit {
  faixas: InssTable[];
  baseInss: number = 0;
  inss: number = 0;
  aCalcular: number;
  loading : boolean = false;
  

  constructor(private calcinssService: CalcinssService) { }

  ngOnInit(): void { }
  
  async calc(NewSalario: string): Promise<void> {
    this.loading = true;
    var salario = Number(NewSalario);
    this.inss = await this.calcinssService.calc(Number(salario));
    this.loading = false;
    this.baseInss = salario;

  }








}
