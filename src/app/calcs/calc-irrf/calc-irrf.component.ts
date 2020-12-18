
import { CalcirrfService } from '../../services/calc-irrf/calcirrf.service';
import { Component, OnInit } from '@angular/core';
import { CalcinssService } from 'src/app/services/calc-inss/calcinss.service';




@Component({
  selector: 'app-calc-irrf',
  templateUrl: './calc-irrf.component.html',
  styleUrls: ['./calc-irrf.component.scss']
})
export class CalcIrrfComponent implements OnInit {
  baseIrrf: number = 0;
  irrf: number = 0;
  aCalcular: number;
  loading : boolean = false;
  


  constructor(private calcirrfService: CalcirrfService, private calcinssService: CalcinssService) { }

  ngOnInit(): void { }


  async calc(salario: string, dependentes: string): Promise<void> {
    this.loading = true;
    this.baseIrrf = await this.calcirrfService.calcBaseIrrf(Number(salario), Number(dependentes));
    this.irrf = await this.calcirrfService.calc(Number(salario), Number(dependentes));
    this.loading = false;

  }

}








