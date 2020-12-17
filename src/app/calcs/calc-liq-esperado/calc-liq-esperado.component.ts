import { CalcliqesperadoService } from './../../services/calc-liq-esperado/calcliqesperado.service';
import { Component, OnInit } from '@angular/core';
import { truncateDecimals } from 'src/app/shared/functions';

@Component({
  selector: 'app-calc-liq-esperado',
  templateUrl: './calc-liq-esperado.component.html',
  styleUrls: ['./calc-liq-esperado.component.scss']
})
export class CalcLiqEsperadoComponent implements OnInit {
  salarioCarteira : number;
  dependentes : number;
  salarioLiquido : number;
  
  constructor(private calcLiqEsperadoService : CalcliqesperadoService) { }

  ngOnInit(): void {
  }
  async calc(salario: string, dependentes : String): Promise<void> {
    
    this.salarioCarteira = truncateDecimals( await this.calcLiqEsperadoService.calc(Number(salario), Number(dependentes)),4); 
    this.salarioLiquido = Number(salario);
    

  }
}
