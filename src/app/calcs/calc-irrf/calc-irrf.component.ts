

import { IrrfTable } from '../../models/calc-irrf/irrftable';
import { CalcirrfService } from '../../services/calc-irrf/calcirrf.service';
import { Component, OnInit } from '@angular/core';
import { truncateDecimals } from '../../shared/functions';
import { CalcinssService } from 'src/app/services/calc-inss/calcinss.service';
import { CalcInssComponent } from '../calc-inss/calc-inss.component';



@Component({
  selector: 'app-calc-irrf',
  templateUrl: './calc-irrf.component.html',
  styleUrls: ['./calc-irrf.component.scss']
})
export class CalcIrrfComponent implements OnInit {
  faixas: IrrfTable[];
  baseIrrf: number;
  irrf: number;
  aCalcular: number;
  dependentes;


  constructor(private calcirrfService: CalcirrfService, private calcinssService: CalcinssService) { }

  ngOnInit(): void {
    this.getIrrfTable();
  }

  getIrrfTable(): void {
    this.calcirrfService.getTable()
      .subscribe(faixas => this.faixas = faixas);
  }

  async calc(salario: string, dependentes: string): Promise<void> {
    var inss = await this.calcinssService.calc(Number(salario));
    var baseirrf = Number(salario) - inss;
    var faixa: IrrfTable;
    var irrf: number;

    if (baseirrf > 0) {
      for (faixa of this.faixas) {
        if (baseirrf > faixa.de) {
          irrf = ((baseirrf * faixa.aliquota) / 100) - faixa.parcela;

        }
      }
      this.baseIrrf = baseirrf;
      this.irrf = truncateDecimals(irrf, 2);
    }
  }

}








