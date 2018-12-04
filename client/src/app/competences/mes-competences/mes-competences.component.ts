import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {RequestOptions} from '@angular/http';

import {MesCookies} from '../../mesCookies';


@Component({
  selector: 'app-mes-competences',
  templateUrl: './mes-competences.component.html',
  styleUrls: ['./mes-competences.component.css']
})
export class MesCompetencesComponent implements OnInit {

    private userMail : String;

    private competences: Object[];
    
  constructor(private mesCookies:MesCookies,
       private competencesService: CompetencesService,
        private router : Router) { }

  ngOnInit() {
      this.userMail=this.mesCookies.getUserMail();
      this.competencesService.getCompetences("/membre/"+this.mesCookies.getUserMail()).subscribe(res => this.competences = res);
  }

  versCreationCompetence(){
      this.router.navigate(['creationCompetence']);
  }

  suppression(id){
      this.competencesService.deleteCompetence(id).subscribe();
      this.router.navigate(['mesCompetences']);
  }

  modification(id){
      console.log("clic on modif");
      this.router.navigate(['modifCompetence/'+id]);
  }

}
