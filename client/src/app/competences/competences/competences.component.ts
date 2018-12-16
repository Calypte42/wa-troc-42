import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MesCookies} from '../../mesCookies';


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

    private voirTout : boolean = false;

  constructor(private mesCookies:MesCookies,private router : Router,
      private competencesService : CompetencesService,
      private route : ActivatedRoute) { }

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
            this.competencesService.getCompetences("/ville/"+this.mesCookies.getVille()).subscribe(res => this.competences = res);
        }
        else{
            this.competencesService.getCompetences("").subscribe(res => this.competences = res);
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
