import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service'
import { CompetencesService } from '../../competences/competences.service'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { MesCookies } from '../../mesCookies';

@Component({
  selector: 'app-gestion-services',
  templateUrl: './gestion-services.component.html',
  styleUrls: ['./gestion-services.component.css']
})
export class GestionServicesComponent implements OnInit {

  private userMail: String;

  private services: Object[];

  constructor(
    private mesCookies: MesCookies,
    private serviceService: ServiceService,
    private competencesService: CompetencesService,
    private router: Router) { }

  ngOnInit() {
    this.userMail = this.mesCookies.getUserMail();
    this.serviceService.getService("/membre/preteur/competences/service/" + this.mesCookies.getUserMail()).subscribe(res => this.services = res);
  }

  accepter(id, emailUtilisateur) {
    this.serviceService.updateService(id, "en_cours", emailUtilisateur, this.userMail).subscribe(res => {
      this.serviceService.getService("/membre/preteur/competences/service/" + this.mesCookies.getUserMail()).subscribe(res => this.services = res);
    });
  }

  refuser(id, emailUtilisateur, ID_comp_bien, date, heureD, heureF) {
    this.serviceService.deleteService(id).subscribe(res => {
      this.serviceService.getService("/membre/preteur/competences/service/" + this.mesCookies.getUserMail()).subscribe(res => this.services = res);
      this.serviceService.remboursement(emailUtilisateur).subscribe();
      this.competencesService.updateStatutDisponibilite(ID_comp_bien, "Disponible", date, heureD, heureF).subscribe();
    });
  }

  serviceFini(id, idComp, removeDate, removeHeureD, removeHeureF) {
    this.serviceService.updateService(id, "termine").subscribe(res => {
      this.serviceService.getService("/membre/preteur/competences/service/" + this.mesCookies.getUserMail()).subscribe(res => this.services = res);
    });
    let nouvelleDate = [];
    console.log("yop")
    let ancienneDate;
    for (let service of this.services) {
      if (service['competence']['_id'] == idComp) {
          console.log(service);
        ancienneDate = service['competence']['disponibilite'];
        nouvelleDate = [];
        for (let dispo of ancienneDate) {
          if (dispo.date != removeDate || dispo.heureD != removeHeureD || dispo.heureF != removeHeureF) {
            nouvelleDate.push(dispo);
          }
        }
      }
    }
    this.competencesService.updateDisponibilite(idComp, nouvelleDate).subscribe();

  }

}
