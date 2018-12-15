import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpruntService } from './emprunt.service';
import { GestionEmpruntsComponent } from './gestion-emprunts/gestion-emprunts.component';
import { MesEmpruntsComponent } from './mes-emprunts/mes-emprunts.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GestionEmpruntsComponent, MesEmpruntsComponent],
  providers:[
      EmpruntService
  ]
})
export class EmpruntModule { }
