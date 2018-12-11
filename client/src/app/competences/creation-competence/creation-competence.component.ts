import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {RequestOptions} from '@angular/http';

import {MesCookies} from '../../mesCookies';

@Component({
  selector: 'app-creation-competence',
  templateUrl: './creation-competence.component.html',
  styleUrls: ['./creation-competence.component.css']
})
export class CreationCompetenceComponent implements OnInit {

    //@Input() email : String;

    constructor(private mesCookies:MesCookies,
        private http:HttpClient, private competencesService:CompetencesService,
                  private router:Router) { }

    ngOnInit() {}


    onSubmit(form: NgForm) {
        if(this.mesCookies.getRole()!="invit"){

            console.log(form);
            const descriptif = form.value['descriptif'];
            const mots_clefs = form.value['mots_clefs'];
            const disponibilite = [];
            let retourServeur = this.competencesService.putCompetence(descriptif,mots_clefs,this.mesCookies.getUserMail(),disponibilite).subscribe();
            console.log(retourServeur);
        }
        let self=this;
        setTimeout(function(){self.router.navigate(['mesCompetences'])},1000);
        //this.router.navigate(['mesCompetences']);

    }

    retourAccueil(){
        this.router.navigate(['']);
    }

}
