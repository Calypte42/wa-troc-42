import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MembresComponent } from './membres/membres.component';
import { MembresService } from './membres.service';
import { RechercheMembreComponent } from './recherche-membre/recherche-membre.component';
import { InscriptionMembreComponent } from './inscription-membre/inscription-membre.component';

@NgModule({
  declarations: [ MembresComponent, RechercheMembreComponent, InscriptionMembreComponent ],
  imports: [ BrowserModule, HttpClientModule, FormsModule ],
  exports: [ MembresComponent, RechercheMembreComponent, InscriptionMembreComponent ],
  providers: [ MembresService ],
  bootstrap: []
})
export class MembresModule { }
