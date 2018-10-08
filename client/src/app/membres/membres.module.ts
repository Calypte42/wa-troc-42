import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MembresComponent } from './membres/membres.component';
import { MembresService } from './membres.service';

@NgModule({
  declarations: [ MembresComponent ],
  imports: [ BrowserModule, HttpClientModule ],
  exports: [ MembresComponent ],
  providers: [ MembresService ],
  bootstrap: []
})
export class MembresModule { }
