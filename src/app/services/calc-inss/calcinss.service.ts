import { IrrfTable } from './../../models/calc-irrf/irrftable';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';
import { InssTable } from './../../models/calc-inss/insstable';
import { truncateDecimals } from 'src/app/shared/functions';

@Injectable({
  providedIn: 'root'
})
export class CalcinssService {
  private tableUrl = 'api/insstable';
  inss : number;
    
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
    

  getTable(): Observable<InssTable[]> {
    return this.http.get<InssTable[]>(this.tableUrl)
      .pipe(
        tap(_ => this.log('fetched insstable')),
        catchError(this.handleError<InssTable[]>('getInssTable', []))
      );
  }

  async getAsyncData(): Promise<InssTable[]> {
    var faixas = await this.http.get<InssTable[]>(this.tableUrl).toPromise();
    // console.log('No issues, I will wait until promise is resolved..');
    // console.log(this.subscribeData);
    return faixas;
  }


  async calc(salario : number) : Promise<number> {
    var faixa:InssTable;
    var faixas: InssTable[];
    
    var faixa: InssTable;
    let resultado = new Array;
    var inss: number;
    var saldo: number = salario;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    faixas = await this.getAsyncData();
    // console.log(faixas.toString);
    // return 1;

    if (salario > 0) {
        for (faixa of faixas) {
          if (salario > faixa.ate) {
            inss = ((faixa.ate - faixa.de) * faixa.aliquota) / 100;                    
            resultado.push(truncateDecimals(inss, 2));
            saldo = saldo - (faixa.ate - faixa.de);
          }
          else {
            if (saldo > 0) {
              inss = ((salario - faixa.de) * faixa.aliquota) / 100;
              resultado.push(truncateDecimals(inss, 2));
              saldo = 0;
            }
  
          }
  
        }                 
    }
    console.log(truncateDecimals(resultado.reduce(reducer), 2));
    return truncateDecimals(resultado.reduce(reducer), 2);
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
