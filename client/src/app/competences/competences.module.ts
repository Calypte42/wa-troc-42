import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationCompetenceComponent } from './creation-competence/creation-competence.component';
import { CompetencesComponent } from './competences/competences.component';
import { CompetencesService } from './competences.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreationCompetenceComponent, CompetencesComponent],
  exports: [ CompetencesComponent],
  providers: [ CompetencesService ],
})
export class CompetencesModule { }
