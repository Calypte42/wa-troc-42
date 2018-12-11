import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

import { MembresComponent } from './membres/membres.component';
import { MembresService } from './membres.service';
import { RechercheMembreComponent } from './recherche-membre/recherche-membre.component';
import { InscriptionMembreComponent } from './inscription-membre/inscription-membre.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AccueilComponent } from './accueil/accueil.component';



@NgModule({
  declarations: [ MembresComponent, RechercheMembreComponent, InscriptionMembreComponent, AuthentificationComponent, AccueilComponent ],
  imports: [ BrowserModule, HttpClientModule, FormsModule,RouterModule ],
  exports: [ MembresComponent, RechercheMembreComponent, InscriptionMembreComponent,AuthentificationComponent ],
  providers: [ MembresService ],
  bootstrap: []
})
export class MembresModule { }
