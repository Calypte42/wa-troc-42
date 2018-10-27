import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MembresModule } from './membres/membres.module';
import { TrajetsModule } from './trajets/trajets.module';
import { BiensModule} from './biens/biens.module';
import { CompetencesModule} from './competences/competences.module';
import { EmpruntModule} from './emprunt/emprunt.module';

import { AppComponent } from './app.component';


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
    EmpruntModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
