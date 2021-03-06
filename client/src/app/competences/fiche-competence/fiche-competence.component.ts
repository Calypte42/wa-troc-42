import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { ServiceService } from '../../service/service.service'
import { MembresService } from '../../membres/membres.service'
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
  private membre: any;


  constructor(private mesCookies: MesCookies, private router: Router,
    private competencesService: CompetencesService,
    private serviceService: ServiceService,
    private membresService: MembresService,
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
        self.membresService.getMembres("/email/" + self.mesCookies.getUserMail()).subscribe(res => self.membre = res[0]);
      });
    });

  }

  versCompetences() {
    this.router.navigate(['listeCompetence']);
  }

  reserver(date, heureD, heureF) {
    var self = this;
    this.serviceService.reservationService(this.information._id, this.userMail, date, heureD, heureF).subscribe(res => {

      this.competencesService.updateStatutDisponibilite(this.information._id, "Indisponible", date, heureD, heureF).subscribe(res => {
        self.competencesService.getAllInformationCompetence(self.information._id).subscribe(res => {
          self.information = res[0];
        });
      });

    });
  }

}
