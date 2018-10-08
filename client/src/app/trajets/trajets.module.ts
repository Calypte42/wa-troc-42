import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TrajetsComponent } from './trajets/trajets.component';
import { TrajetsService } from './trajets.service';

@NgModule({
  declarations: [ TrajetsComponent ],
  imports: [ BrowserModule, HttpClientModule ],
  exports: [ TrajetsComponent ],
  providers: [ TrajetsService ],
  bootstrap: []
})
export class TrajetsModule { }
