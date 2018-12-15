import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BiensService } from '../biens.service';
import { EmpruntService } from '../../emprunt/emprunt.service'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { MesCookies } from '../../mesCookies';


@Component({
  selector: 'app-mes-biens',
  templateUrl: './mes-biens.component.html',
  styleUrls: ['./mes-biens.component.css']
})

export class MesBiensComponent implements OnInit {

  private userMail: String;

  private biens: Object[];
  private derniereUtilisation: Object[];

  constructor(
    private mesCookies: MesCookies,
    private biensService: BiensService,
    private empruntService : EmpruntService,
    private router: Router) { }

  ngOnInit() {
    this.userMail = this.mesCookies.getUserMail();
    this.biensService.getBiens("/avecUtilisations/membre/" + this.mesCookies.getUserMail()).subscribe(res => this.biens = res);
  }

  versCreationBien() {
    this.router.navigate(['creationBien']);
  }

  suppression(id) {
    this.biensService.deleteBien(id).subscribe();
    this.biensService.getBiens("/membre/" + this.mesCookies.getUserMail()).subscribe(res => this.biens = res);
  }

  modification(id) {
    console.log("clic on modif");
    this.router.navigate(['modifBien/' + id]);
  }

  inscription(id){
      this.router.navigate(['ficheBien',id]);
  }

}
