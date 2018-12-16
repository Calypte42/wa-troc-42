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
import { AccueilComponent} from './membres/accueil/accueil.component';
import { ModifMembreComponent} from './membres/modif-membre/modif-membre.component';

import { CompetencesComponent} from './competences/competences/competences.component';
import { CreationCompetenceComponent} from './competences/creation-competence/creation-competence.component';
import { MesCompetencesComponent } from './competences/mes-competences/mes-competences.component';
import { FicheCompetenceComponent } from './competences/fiche-competence/fiche-competence.component';
import { ModifCompetenceComponent } from './competences/modif-competence/modif-competence.component';

import { BiensComponent} from './biens/biens/biens.component';
import { CreationBienComponent} from './biens/creation-bien/creation-bien.component';
import { MesBiensComponent } from './biens/mes-biens/mes-biens.component';
import { ModifBienComponent } from './biens/modif-bien/modif-bien.component';
import { FicheBienComponent } from './biens/fiche-bien/fiche-bien.component';

import { GestionEmpruntsComponent } from './emprunt/gestion-emprunts/gestion-emprunts.component';
import { MesEmpruntsComponent } from './emprunt/mes-emprunts/mes-emprunts.component';

import { MesCookies} from './mesCookies';

import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'creationMembre', component: InscriptionMembreComponent },
  { path: 'updateMembre', component: ModifMembreComponent },
  { path: 'creationMembre/:erreur', component: InscriptionMembreComponent },
  { path: '', component:  AccueilComponent },
  { path:'gestionAdmin', component:MembresComponent},
  { path: 'listeCompetence', component: CompetencesComponent},
  { path: 'listeCompetence/:email/:isAuth', component: CompetencesComponent},
  { path: 'creationCompetence', component: CreationCompetenceComponent},
  { path : 'ficheCompetence/:id', component: FicheCompetenceComponent},
  { path : 'mesCompetences', component:MesCompetencesComponent},
  { path : 'modifCompetence/:id', component:ModifCompetenceComponent},
  { path: 'listeBien', component: BiensComponent},
  { path: 'listeBien/:email/:isAuth', component: BiensComponent},
  { path: 'creationBien', component: CreationBienComponent},
  { path : 'modifBien/:id', component:ModifBienComponent},
  { path : 'ficheBien/:id', component: FicheBienComponent},
  { path : 'mesBiens', component:MesBiensComponent},
  { path : 'gestionEmprunts', component:GestionEmpruntsComponent},
  { path : 'mesEmprunts', component:MesEmpruntsComponent}
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
  providers: [MesCookies],
  bootstrap: [AppComponent]
})
export class AppModule { }
