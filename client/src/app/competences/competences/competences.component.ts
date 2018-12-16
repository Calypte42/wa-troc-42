import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MesCookies} from '../../mesCookies';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';


@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {
    private competences: Object[];

    private userMail : String;
    private isAuth : boolean = false;
    private params : Params;
    private ville : String ="";
    dataTable: any;

    private voirTout : boolean = false;

  constructor(private mesCookies:MesCookies,private router : Router,
      private competencesService : CompetencesService,
      private route : ActivatedRoute, private chRef: ChangeDetectorRef) { }

  ngOnInit() {


      this.userMail=this.mesCookies.getUserMail();
      this.isAuth=this.mesCookies.getIsAuth();
      this.ville=this.mesCookies.getVille();
      if(this.ville==""){
          this.voirTout=true;
      }
      /*this.route.params.subscribe(function(params:Params){
          console.log(params.email);

          if(params.email!=""){
                this.userMail=params.email;
                this.isAuth=true;
            }
        console.log(this.userMail);*/



      //recuperation des données de la route :

      //-------------------------------------
      if(this.ville!="" && this.voirTout==false){
            this.competencesService.getCompetences("/ville/"+this.mesCookies.getVille()).subscribe(res => {
                this.competences = res;
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
        else{
            this.competencesService.getCompetences("").subscribe(res => {
            this.competences = res;
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
            } );
        }

  }

  versMesCompetences(){
      // Rajouter le mail de l'utilisateur
      this.router.navigate(['mesCompetences']);
  }

  voirToute(){
      this.voirTout=true;
      this.ngOnInit();
  }

  voirLocal(){
      this.voirTout=false;
      this.ngOnInit();
  }


  inscription(id){
      this.router.navigate(['ficheCompetence',id]);
  }

}
