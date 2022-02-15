import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipeComponent } from './components/equipe/equipe.component';
import { StadeComponent } from './components/stade/stade.component';

const routes: Routes = [
  {path : 'equipe' , component  : EquipeComponent},
  {path : 'stade' , component : StadeComponent},
  {path : '' , redirectTo : 'equipe' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
