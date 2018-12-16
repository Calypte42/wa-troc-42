import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { BiensService } from '../biens.service';
import { EmpruntService } from '../../emprunt/emprunt.service'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { MesCookies } from '../../mesCookies';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';


@Component({
  selector: 'app-mes-biens',
  templateUrl: './mes-biens.component.html',
  styleUrls: ['./mes-biens.component.css']
})

export class MesBiensComponent implements OnInit {

  private userMail: String;

  private biens: Object[];
  private derniereUtilisation: Object[];

  dataTable: any;


  constructor(
    private mesCookies: MesCookies,
    private biensService: BiensService,
    private empruntService : EmpruntService,
    private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.userMail = this.mesCookies.getUserMail();
    this.biensService.getBiens("/avecUtilisations/membre/" + this.mesCookies.getUserMail()).subscribe(res => {
        this.biens = res;
        this.chRef.detectChanges();
        const table: any = $('#monTableau');
         this.dataTable = table.DataTable({
         "columnDefs": [
             { "orderSequence": [ "asc" ], "targets": [ 0 ] },
             { "orderSequence": [ "desc" ], "targets": [ 1 ] }
         ],
         language: {
         processing:     "Traitement en cours...",
         search:         "Rechercher&nbsp;:",
         lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
         info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
         infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
         infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
         infoPostFix:    "",
         loadingRecords: "Chargement en cours...",
         zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
         emptyTable:     "Aucune donnée disponible dans le tableau",
         paginate: {
             first:      "Premier",
             previous:   "Pr&eacute;c&eacute;dent",
             next:       "Suivant",
             last:       "Dernier"
         },
         aria: {
             sortAscending:  ": activer pour trier la colonne par ordre croissant",
             sortDescending: ": activer pour trier la colonne par ordre décroissant"
         }
     }
         });
    });
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
