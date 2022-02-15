import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { StadeComponent } from './components/stade/stade.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { EquipeService } from './shared/services/equipe.service';
import { StadeService } from './shared/services/stade.service';
=======
import { MatchesComponent } from './matches/matches.component';
import { ArbitresComponent } from './arbitres/arbitres.component';
import { JoueursComponent } from './joueurs/joueurs.component';
import { HttpClientModule } from '@angular/common/http';
import {JoueurService} from './shared/services/joueur.service';
import {ArbitreService} from './shared/services/arbitre.service';
import { MatcheService } from './shared/services/matche.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared/shared.module';
>>>>>>> c009cefb32849edb7a1f963b6522f38ee943796c

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    StadeComponent,
    EquipeComponent
=======
    MatchesComponent,
    ArbitresComponent,
    JoueursComponent
>>>>>>> c009cefb32849edb7a1f963b6522f38ee943796c
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
<<<<<<< HEAD
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [EquipeService, StadeService],
  bootstrap: [AppComponent , StadeComponent , EquipeComponent]
=======
    SharedModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule.forRoot({maxMessages:5,timeout:5000,positionX:"right"}),
    BrowserAnimationsModule
  ],
  providers: [MatcheService],
  bootstrap: [AppComponent]
>>>>>>> c009cefb32849edb7a1f963b6522f38ee943796c
})
export class AppModule { }
