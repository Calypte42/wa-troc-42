import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service'
import { CompetencesService } from '../../competences/competences.service'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { MesCookies } from '../../mesCookies';

@Component({
  selector: 'app-mes-services',
  templateUrl: './mes-services.component.html',
  styleUrls: ['./mes-services.component.css']
})
export class MesServicesComponent implements OnInit {

    private userMail: String;

    private mesServices: Object[];

    constructor(
      private mesCookies: MesCookies,
      private serviceService : ServiceService,
      private competencesService: CompetencesService,
      private router: Router) { }

    ngOnInit() {
      this.userMail = this.mesCookies.getUserMail();
      this.serviceService.getService("/membre/utilisateur/competences/" + this.mesCookies.getUserMail()).subscribe(res => this.mesServices = res);
    }

    annuler(id, emailUtilisateur, ID_comp_bien, date, heureD, heureF) {
      this.serviceService.deleteService(id).subscribe(res => {
          this.serviceService.getService("/membre/utilisateur/competences/" + this.mesCookies.getUserMail()).subscribe(res => this.mesServices = res);
          this.serviceService.remboursement(emailUtilisateur).subscribe();
          this.competencesService.updateStatutDisponibilite(ID_comp_bien, "Disponible", date, heureD, heureF).subscribe();
      });
    }

}
