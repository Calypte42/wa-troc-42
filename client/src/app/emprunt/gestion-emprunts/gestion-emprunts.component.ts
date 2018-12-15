import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmpruntService } from '../emprunt.service'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { MesCookies } from '../../mesCookies';


@Component({
  selector: 'app-gestion-emprunts',
  templateUrl: './gestion-emprunts.component.html',
  styleUrls: ['./gestion-emprunts.component.css']
})

export class GestionEmpruntsComponent implements OnInit {

  private userMail: String;

  private demandesEmpruntBien: Object[];

  constructor(
    private mesCookies: MesCookies,
    private empruntService : EmpruntService,
    private router: Router) { }

  ngOnInit() {
    this.userMail = this.mesCookies.getUserMail();
    this.empruntService.getEmprunt("/membre/preteur/biens/demandeEmprunt/" + this.mesCookies.getUserMail()).subscribe(res => this.demandesEmpruntBien = res);
  }

//  versCreationBien() {
//    this.router.navigate(['creationBien']);
//  }

  accepter(id, emailEmprunteur) {
    this.empruntService.updateEmprunt(id, "en_cours", emailEmprunteur, this.userMail).subscribe(res => {
        this.empruntService.getEmprunt("/membre/preteur/biens/demandeEmprunt/" + this.mesCookies.getUserMail()).subscribe(res => this.demandesEmpruntBien = res);
    });
  }

  refuser(id, emailEmprunteur) {
    this.empruntService.deleteEmprunt(id).subscribe(res => {
        this.empruntService.getEmprunt("/membre/preteur/biens/demandeEmprunt/" + this.mesCookies.getUserMail()).subscribe(res => this.demandesEmpruntBien = res);
        this.empruntService.remboursement(emailEmprunteur).subscribe();
    });
  }

 empruntFini(id) {
    this.empruntService.updateEmprunt(id, "termine").subscribe(res => {
        this.empruntService.getEmprunt("/membre/preteur/biens/demandeEmprunt/" + this.mesCookies.getUserMail()).subscribe(res => this.demandesEmpruntBien = res);
    });
  }

}
