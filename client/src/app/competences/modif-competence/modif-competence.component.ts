import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MesCookies} from '../../mesCookies';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-modif-competence',
  templateUrl: './modif-competence.component.html',
  styleUrls: ['./modif-competence.component.css']
})
export class ModifCompetenceComponent implements OnInit {
    private id : String;

    private competences:Object[];
    private competence:any;


  constructor(private mesCookies:MesCookies,private router : Router,
      private competencesService : CompetencesService,
      private route : ActivatedRoute) { }

  ngOnInit() {
      // Utilise pour pouvoir acceder a this (component) dans une fonction.
      var self = this;
      let monSubscribe = this.route.params.subscribe(function(params:Params){

          console.log(params.id);
          self.id=params.id;
          self.competencesService.getCompetences("/id/"+params.id).subscribe(res => {
              self.competences = res;
              console.log("resultat : "+JSON.stringify(res[0]));
              self.competence=res[0];
          });
          });


}

onSubmit(form: NgForm) {
        console.log(form);
        const descriptif = form.value['descriptif'];
        const mots_clefs = form.value['mots_clefs'];
        let retourServeur = this.competencesService.updateCompetence(this.id,descriptif,mots_clefs).subscribe();
        console.log(retourServeur);


    this.ngOnInit();

}

onSubmitDispo(form:NgForm){
    let nouvelleDispo=[];
    for(let dispo of this.competence.disponibilite){
        nouvelleDispo.push(dispo);
    }
    nouvelleDispo.push(
        {"date":form.value['date'],"heureD":form.value['heureD'],
        "heureF":form.value['heureF'],"status":"Disponible"}
    );
    let retourServeur = this.competencesService.updateDisponibilite(this.id,nouvelleDispo).subscribe();
    this.ngOnInit();

}

}
