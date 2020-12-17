

import { IrrfTable } from '../../models/calc-irrf/irrftable.model';
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
  baseIrrf: number;
  irrf: number;
  aCalcular: number;
  


  constructor(private calcirrfService: CalcirrfService, private calcinssService: CalcinssService) { }

  ngOnInit(): void { }


  async calc(salario: string, dependentes: string): Promise<void> {
    this.baseIrrf = await this.calcirrfService.calcBaseIrrf(Number(salario), Number(dependentes));
    this.irrf = await this.calcirrfService.calc(Number(salario), Number(dependentes));

  }

}








