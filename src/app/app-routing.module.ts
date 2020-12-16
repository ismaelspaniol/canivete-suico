

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CalcInssComponent } from './calcs/calc-inss/calc-inss.component';
import { CalcIrrfComponent } from './calcs/calc-irrf/calc-irrf.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'calcinss', component: CalcInssComponent },
  { path: 'calcirrf', component: CalcIrrfComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
