import { IrrfTable } from '../../models/calc-irrf/irrftable.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';
import { truncateDecimals } from 'src/app/shared/functions';
import { CalcinssService } from '../calc-inss/calcinss.service';



@Injectable({
  providedIn: 'root'
})
export class CalcirrfService {
  valorDependente : number = 179.71;
  private tableUrl = 'api/irrftable';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private calcinssService : CalcinssService) { }




  async getTable(): Promise<IrrfTable[]> {
    var faixas = await this.http.get<IrrfTable[]>(this.tableUrl).toPromise();    
    return faixas;
  }


  async calcBaseIrrf(salario : number, dependentes : number): Promise<number>{
    var inss = await this.calcinssService.calc(salario);
    var baseirrf = salario - inss;
    var totalDependentes = dependentes * this.valorDependente;
    baseirrf = baseirrf - totalDependentes;
    return baseirrf;

  }

  async calc(salario: number, dependentes : number): Promise<number> {
    
    var baseirrf = await this.calcBaseIrrf(salario, dependentes);
    
    return this.calcIrrf(await this.getTable(), baseirrf );
   
  }

  calcIrrf(faixas: IrrfTable[], baseirrf: number){
    var faixa: IrrfTable;
    var faixas: IrrfTable[];  
    var irrf;   

    if (baseirrf > 0) {
      for (faixa of faixas) {
        if (baseirrf > faixa.de) {
          irrf = ((baseirrf * faixa.aliquota) / 100) - faixa.parcela;

        }
      }
      
      irrf = truncateDecimals(irrf, 2);
    }
    return irrf;
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TableInssService: ${message}`);
  }

}

