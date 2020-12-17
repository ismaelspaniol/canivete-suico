import { IrrfTable } from './../../models/calc-irrf/irrftable.model';
import { InssTable } from './../../models/calc-inss/insstable.model';
import { CalcinssService } from './../calc-inss/calcinss.service';

import { Injectable } from '@angular/core';
import { CalcirrfService } from '../calc-irrf/calcirrf.service';

@Injectable({
  providedIn: 'root'
})
export class CalcliqesperadoService {
  salarioNecessario;

  constructor(private calcInssService: CalcinssService, private calcirrfService : CalcirrfService) { }


  async calc(salarioEsperado: number, dependentes : number): Promise<number> {
    var faixa: InssTable;
    var faixasInss: InssTable[] = await this.calcInssService.getTable();
    var faixasIrrf: IrrfTable[] = await this.calcirrfService.getTable();
    var carteira: number;
    var inss,irrf, salario, i: number;

    i = 0;
    do {
      salario = salarioEsperado;

      salario += i;
      i += 0.01;
      carteira = salario;
      inss = this.calcInssService.calcInss(faixasInss, salario);

      let baseIrrf : number;
      baseIrrf = salario;
      baseIrrf -= inss;
      baseIrrf -= this.calcirrfService.valorDependente * dependentes;
      irrf = this.calcirrfService.calcIrrf(faixasIrrf,baseIrrf);
      
      salario -=irrf;
      salario -=inss;




    } while (salario < salarioEsperado);
    console.log(salario);
     return carteira;




  }


}
