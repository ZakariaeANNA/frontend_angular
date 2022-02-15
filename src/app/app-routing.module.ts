import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipeComponent } from './components/equipe/equipe.component';
import { StadeComponent } from './components/stade/stade.component';
import { MatchesComponent } from './matches/matches.component';
import { ArbitresComponent } from './arbitres/arbitres.component';
import { JoueursComponent } from './joueurs/joueurs.component';


const routes: Routes = [
  {path : 'equipe' , component  : EquipeComponent},
  {path : 'stade' , component : StadeComponent},
  {path : "arbitres" , component : ArbitresComponent},
  {path : "joueurs" , component : JoueursComponent},
  {path : "matches" , component : MatchesComponent},
  {path : "" , redirectTo : "arbitres" , pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
