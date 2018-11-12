import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {
    private competences: Object[];

  constructor(private router : Router,private competencesService : CompetencesService) { }

  ngOnInit() {
       this.competencesService.getCompetences("").subscribe(res => this.competences = res);
  }


  versCreationCompetence(){
      this.router.navigate(['creationCompetence']);
  }





}
