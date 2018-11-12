import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {RequestOptions} from '@angular/http';

@Component({
  selector: 'app-creation-competence',
  templateUrl: './creation-competence.component.html',
  styleUrls: ['./creation-competence.component.css']
})
export class CreationCompetenceComponent implements OnInit {

    @Input() email : String;

    constructor(private http:HttpClient, private competencesService:CompetencesService,
                  private router:Router) { }

    ngOnInit() {}


    onSubmit(form: NgForm) {
        console.log(form);
        const descriptif = form.value['descriptif'];
        const mots_clefs = form.value['mots_clefs'];
        const disponibilite = form.value['disponibilite'];
        let retourServeur = this.competencesService.putCompetence(descriptif,mots_clefs,this.email,disponibilite).subscribe();
        console.log(retourServeur);
        this.router.navigate(['listeCompetence']);

    }

    retourAccueil(){
        this.router.navigate(['']);
    }

}
