import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipeComponent } from './components/equipe/equipe.component';
import { StadeComponent } from './components/stade/stade.component';
import { MatchesComponent } from './components/matches/matches.component';
import { ArbitresComponent } from './components/arbitres/arbitres.component';
import { JoueursComponent } from './components/joueurs/joueurs.component';


const routes: Routes = [
  {path : 'equipe' , component  : EquipeComponent},
  {path : 'stade' , component : StadeComponent},
  {path : "arbitres" , component : ArbitresComponent},
  {path : "joueurs" , component : JoueursComponent},
  {path : "matches" , component : MatchesComponent},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
