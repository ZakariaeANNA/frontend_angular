import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StadeComponent } from './components/stade/stade.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { EquipeService } from './shared/services/equipe.service';
import { StadeService } from './shared/services/stade.service';
import { MatchesComponent } from './matches/matches.component';
import { ArbitresComponent } from './arbitres/arbitres.component';
import { JoueursComponent } from './joueurs/joueurs.component';
import {JoueurService} from './shared/services/joueur.service';
import {ArbitreService} from './shared/services/arbitre.service';
import { MatcheService } from './shared/services/matche.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    StadeComponent,
    EquipeComponent,
    MatchesComponent,
    ArbitresComponent,
    JoueursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule.forRoot({maxMessages:5,timeout:5000,positionX:"right"}),
    BrowserAnimationsModule
  ],
  providers: [MatcheService,EquipeService, StadeService],
  bootstrap: [AppComponent, StadeComponent , EquipeComponent] 
})
export class AppModule { }
