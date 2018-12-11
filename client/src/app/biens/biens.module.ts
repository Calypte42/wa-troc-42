import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {FormsModule} from '@angular/forms';
import { BiensComponent } from './biens/biens.component';
import { BiensService } from './biens.service';
import { CreationBienComponent } from './creation-bien/creation-bien.component';
import { ModifBienComponent } from './modif-bien/modif-bien.component';
import { FicheBienComponent } from './fiche-bien/fiche-bien.component';
import { MesBiensComponent } from './mes-biens/mes-biens.component';

@NgModule({
  imports: [
    CommonModule, BrowserModule, HttpClientModule, FormsModule
  ],
  exports:[
      BiensComponent
  ],
  declarations: [
      BiensComponent,
      CreationBienComponent,
      ModifBienComponent,
      FicheBienComponent,
      MesBiensComponent
  ],
  providers:[
      BiensService
  ],
  bootstrap:[

  ]
})
export class BiensModule { }
