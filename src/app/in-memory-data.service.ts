import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './models/hero/hero.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const insstable = [
      { seq: 1, de: 0,       ate: 1045,    aliquota: 7.5, versao: 1 },
      { seq: 2, de: 1045.01, ate: 2089.60, aliquota: 9, versao: 1 },
      { seq: 3, de: 2089.61, ate: 3134.40, aliquota: 12, versao: 1 },
      { seq: 4, de: 3134.41, ate: 6101.06, aliquota: 14, versao: 1 }
  ];

  const irrftable = [
    { seq: 1, de: 0,       ate: 1903.98, aliquota: 0, parcela: 0, versao: 1 },
    { seq: 2, de: 1903.99, ate: 2826.65, aliquota: 7.5, parcela: 142.8, versao: 1 },
    { seq: 3, de: 2826.66, ate: 3751.05, aliquota: 15, parcela: 354.8, versao: 1 },
    { seq: 4, de: 3751.06, ate: 4664.68, aliquota: 22.5, parcela: 636.13, versao: 1 },
    { seq: 5, de: 4664.69, ate: 500000, aliquota: 27.5, parcela: 869.36, versao: 1 }
];
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes, insstable, irrftable};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}