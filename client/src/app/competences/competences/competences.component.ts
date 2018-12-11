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

  constructor(private mesCookies:MesCookies,private router : Router,
      private competencesService : CompetencesService,
      private route : ActivatedRoute) { }

  ngOnInit() {

      this.userMail=this.mesCookies.getUserMail();
      this.isAuth=this.mesCookies.getIsAuth();
      /*this.route.params.subscribe(function(params:Params){
          console.log(params.email);

          if(params.email!=""){
                this.userMail=params.email;
                this.isAuth=true;
            }
        console.log(this.userMail);*/



      //recuperation des données de la route :

      //-------------------------------------
       this.competencesService.getCompetences("").subscribe(res => this.competences = res);
  }

  versMesCompetences(){
      // Rajouter le mail de l'utilisateur
      this.router.navigate(['mesCompetences']);
  }


  inscription(id){
      this.router.navigate(['ficheCompetence',id]);
  }

}
