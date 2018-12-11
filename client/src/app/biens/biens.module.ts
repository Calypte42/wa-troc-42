import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BiensComponent } from './biens/biens.component';
import { BiensService } from './biens.service';
import { InsertionBienComponent } from './insertion-bien/insertion-bien.component';

@NgModule({
  imports: [
    CommonModule, BrowserModule, HttpClientModule
  ],
  exports:[
      BiensComponent
  ],
  declarations: [
      BiensComponent,
      InsertionBienComponent
  ],
  providers:[
      BiensService
  ],
  bootstrap:[

  ]
})
export class BiensModule { }
