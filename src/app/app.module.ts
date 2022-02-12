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
    MatchesComponent,
    ArbitresComponent,
    JoueursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    AlertModule.forRoot({maxMessages:5,timeout:5000,positionX:"right"}),
    BrowserAnimationsModule
  ],
  providers: [MatcheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
