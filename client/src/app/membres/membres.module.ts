import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MembresComponent } from './membres/membres.component';
import { MembresService } from './membres.service';
import { RechercheMembreComponent } from './recherche-membre/recherche-membre.component';

@NgModule({
  declarations: [ MembresComponent, RechercheMembreComponent ],
  imports: [ BrowserModule, HttpClientModule ],
  exports: [ MembresComponent, RechercheMembreComponent ],
  providers: [ MembresService ],
  bootstrap: []
})
export class MembresModule { }
