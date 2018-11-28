import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../competences.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MesCookies} from '../../mesCookies';


@Component({
  selector: 'app-modif-competence',
  templateUrl: './modif-competence.component.html',
  styleUrls: ['./modif-competence.component.css']
})
export class ModifCompetenceComponent implements OnInit {
    private id : String="";


  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(function(params:Params){
          console.log("modif competence : "+params.id);
          this.id=params.id;
          console.log("modif competence : "+this.id);


        /*  if(params.email!=""){
                this.userMail=params.email;
                this.isAuth=true;
            }
        console.log(this.userMail);*/
    });
}

}
