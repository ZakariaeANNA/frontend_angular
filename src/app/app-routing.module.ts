import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { EquipeComponent } from './components/equipe/equipe.component';
import { StadeComponent } from './components/stade/stade.component';

const routes: Routes = [
  {path : 'equipe' , component  : EquipeComponent},
  {path : 'stade' , component : StadeComponent},
  {path : '' , redirectTo : 'equipe' , pathMatch : 'full'}
=======
import { MatchesComponent } from './matches/matches.component';
import { ArbitresComponent } from './arbitres/arbitres.component';
import { JoueursComponent } from './joueurs/joueurs.component';


const routes: Routes = [ 
  {path : "arbitres" , component : ArbitresComponent},
  {path : "joueurs" , component : JoueursComponent},
  {path : "matches" , component : MatchesComponent},
  {path : "" , redirectTo : "arbitres" , pathMatch : "full"}
>>>>>>> c009cefb32849edb7a1f963b6522f38ee943796c
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
