import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchesComponent } from './matches/matches.component';
import { ArbitresComponent } from './arbitres/arbitres.component';
import { JoueursComponent } from './joueurs/joueurs.component';
import { HttpClientModule } from '@angular/common/http';
import {JoueurService} from './joueur.service';
import {ArbitreService} from './arbitre.service';
import { MatcheService } from './matche.service';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    ArbitresComponent,
    JoueursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    JoueurService,
    ArbitreService,
    MatcheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
