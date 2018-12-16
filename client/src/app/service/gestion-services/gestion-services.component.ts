import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service'
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

  refuser(id, emailUtilisateur) {
    this.serviceService.deleteService(id).subscribe(res => {
      this.serviceService.getService("/membre/preteur/competences/service/" + this.mesCookies.getUserMail()).subscribe(res => this.services = res);
      this.serviceService.remboursement(emailUtilisateur).subscribe();
    });
  }

  serviceFini(id) {
    this.serviceService.updateService(id, "termine").subscribe(res => {
      this.serviceService.getService("/membre/preteur/competences/service/" + this.mesCookies.getUserMail()).subscribe(res => this.services = res);
    });
  }

}
