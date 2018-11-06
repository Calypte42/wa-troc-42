import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../competences.service';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {
    private competences: Object[];

  constructor(private competencesService : CompetencesService) { }

  ngOnInit() {
       this.competencesService.getCompetences("").subscribe(res => this.competences = res);
  }

  refresh(){
      console.log(this.competences);
  }

}
