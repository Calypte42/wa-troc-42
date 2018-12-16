import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { ServiceService } from '../../service/service.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MesCookies } from '../../mesCookies';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-fiche-competence',
  templateUrl: './fiche-competence.component.html',
  styleUrls: ['./fiche-competence.component.css']
})
export class FicheCompetenceComponent implements OnInit {

  private proprietaire: any;
  private userMail: String;
  private information: any;


  constructor(private mesCookies: MesCookies, private router: Router,
    private competencesService: CompetencesService,
    private serviceService: ServiceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var self = this;
    this.userMail = this.mesCookies.getUserMail();
    let monSubscribe = this.route.params.subscribe(function(params: Params) {
      //self.id=params.id;
      self.competencesService.getAllInformationCompetence(params.id).subscribe(res => {
        self.information = res[0];
        console.log("resultat : " + JSON.stringify(self.information));
        console.log(self.information.listeMembres[0]);
        self.proprietaire = self.information.listeMembres[0];
      });
    });

  }

  versCompetences() {
    this.router.navigate(['listeCompetence']);
  }

  reserver(date, heureD, heureF) {
    this.serviceService.reservationService(this.information._id, this.userMail, date, heureD, heureF).subscribe(res => {
      this.competencesService.getAllInformationCompetence(this.information._id).subscribe(res => {
        this.information = res[0];
      })
    });
    
  }

}
