import { HomeComponent } from './home/home.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CalcInssComponent } from './calcs/calc-inss/calc-inss.component';
import { CalcIrrfComponent } from './calcs/calc-irrf/calc-irrf.component';
import { CalcLiqEsperadoComponent } from './calcs/calc-liq-esperado/calc-liq-esperado.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'calcinss', component: CalcInssComponent },
  { path: 'calcirrf', component: CalcIrrfComponent },
  { path: 'calcliqesperado', component: CalcLiqEsperadoComponent },
  { path: 'home', component: HomeComponent},


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
