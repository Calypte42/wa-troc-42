import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MembresModule } from './membres/membres.module';
import { TrajetsModule } from './trajets/trajets.module';
import { BiensModule} from './biens/biens.module';
import { CompetencesModule} from './competences/competences.module';
import { EmpruntModule} from './emprunt/emprunt.module';

import { InscriptionMembreComponent} from './membres/inscription-membre/inscription-membre.component';
import { MembresComponent} from './membres/membres/membres.component';
import { CompetencesComponent} from './competences/competences/competences.component';
import { CreationCompetenceComponent} from './competences/creation-competence/creation-competence.component';

import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'creationMembre', component: InscriptionMembreComponent },
  { path: '', component:  MembresComponent },
  { path: 'listeCompetence', component: CompetencesComponent},
  {path: 'creationCompetence', component: CreationCompetenceComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MembresModule,
    TrajetsModule,
    BiensModule,
    CompetencesModule,
    EmpruntModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
