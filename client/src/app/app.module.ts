import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MembresModule } from './membres/membres.module';
import { TrajetsModule } from './trajets/trajets.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MembresModule,
    TrajetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
