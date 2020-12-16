import { CalcinssService } from '../../services/calc-inss/calcinss.service';
import { InssTable } from '../../models/calc-inss/insstable';
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
  baseInss: number;
  inss: number;
  aCalcular: number;

  constructor(private calcinssService: CalcinssService) { }

  ngOnInit(): void {
    this.getInssTable();
  }

  getInssTable(): void {
    this.calcinssService.getTable()
      .subscribe(faixas => this.faixas = faixas);
  }


  async calc(NewSalario: string): Promise<void> {
    var salario = Number(NewSalario);
    this.inss = await this.calcinssService.calc(Number(salario));
    this.baseInss = salario;

  }








}
