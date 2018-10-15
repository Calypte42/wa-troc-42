import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MembresModule } from './membres/membres.module';
import { TrajetsModule } from './trajets/trajets.module';

import { AppComponent } from './app.component';
import { BiensComponent } from './biens/biens.component';
import { CompetencesComponent } from './competences/competences.component';
import { EmpruntComponent } from './emprunt/emprunt.component';


@NgModule({
  declarations: [
    AppComponent,
    BiensComponent,
    CompetencesComponent,
    EmpruntComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MembresModule,
    TrajetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
