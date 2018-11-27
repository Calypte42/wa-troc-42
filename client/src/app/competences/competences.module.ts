import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationCompetenceComponent } from './creation-competence/creation-competence.component';
import { CompetencesComponent } from './competences/competences.component';
import { CompetencesService } from './competences.service';


import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FicheCompetenceComponent } from './fiche-competence/fiche-competence.component';
import { MesCompetencesComponent } from './mes-competences/mes-competences.component';
import { ModifCompetenceComponent } from './modif-competence/modif-competence.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,BrowserModule,HttpClientModule
  ],
  declarations: [CreationCompetenceComponent, CompetencesComponent, FicheCompetenceComponent, MesCompetencesComponent, ModifCompetenceComponent],
  exports: [ CompetencesComponent],
  providers: [ CompetencesService ],
})

export class CompetencesModule { }
