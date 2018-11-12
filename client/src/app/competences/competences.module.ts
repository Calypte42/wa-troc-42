import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationCompetenceComponent } from './creation-competence/creation-competence.component';
import { CompetencesComponent } from './competences/competences.component';
import { CompetencesService } from './competences.service';


import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, FormsModule,BrowserModule,HttpClientModule
  ],
  declarations: [CreationCompetenceComponent, CompetencesComponent],
  exports: [ CompetencesComponent],
  providers: [ CompetencesService ],
})

export class CompetencesModule { }
