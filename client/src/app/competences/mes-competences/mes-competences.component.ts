import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { MesCookies } from '../../mesCookies';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-mes-competences',
  templateUrl: './mes-competences.component.html',
  styleUrls: ['./mes-competences.component.css']
})
export class MesCompetencesComponent implements OnInit {

  private userMail: String;

  private competences: Object[];

  dataTable: any;

  constructor(private mesCookies: MesCookies,
    private competencesService: CompetencesService,
    private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.userMail = this.mesCookies.getUserMail();
    this.competencesService.getCompetences("/membre/" + this.mesCookies.getUserMail()).subscribe(res => {
      this.competences = res;
      for (let competence of this.competences) {
        for (let dispo of competence['disponibilite']) {
          if (dispo.statut == "Indisponible") {
            competence['verifIndisponible'] = true;
        } else {
            competence['verifIndisponible'] = false;
        }
        }
      }
      this.chRef.detectChanges();
      const table: any = $('#monTableau');
      this.dataTable = table.DataTable({
        "columnDefs": [
          { "orderSequence": ["asc"], "targets": [0] },
          { "orderSequence": ["desc"], "targets": [1] }
        ],
        language: {
          processing: "Traitement en cours...",
          search: "Rechercher&nbsp;:",
          lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
          info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
          infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
          infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
          infoPostFix: "",
          loadingRecords: "Chargement en cours...",
          zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
          emptyTable: "Aucune donnée disponible dans le tableau",
          paginate: {
            first: "Premier",
            previous: "Pr&eacute;c&eacute;dent",
            next: "Suivant",
            last: "Dernier"
          },
          aria: {
            sortAscending: ": activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
          }
        }
      });
    });
  }

  versCreationCompetence() {
    this.router.navigate(['creationCompetence']);
  }

  suppression(id) {
    this.competencesService.deleteCompetence(id).subscribe();
    this.router.navigate(['mesCompetences']);
  }

  modification(id) {
    this.router.navigate(['modifCompetence/' + id]);
  }

}
