import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StadeComponent } from './components/stade/stade.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { EquipeService } from './shared/services/equipe.service';
import { StadeService } from './shared/services/stade.service';

@NgModule({
  declarations: [
    AppComponent,
    StadeComponent,
    EquipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [EquipeService, StadeService],
  bootstrap: [AppComponent , StadeComponent , EquipeComponent]
})
export class AppModule { }
