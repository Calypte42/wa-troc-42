import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionServicesComponent } from './gestion-services/gestion-services.component';
import { ServiceService } from './service.service';
import { MesServicesComponent } from './mes-services/mes-services.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GestionServicesComponent, MesServicesComponent],
  providers:[
      ServiceService
  ]
})
export class ServiceModule { }
