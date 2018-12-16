import { Component, OnInit } from '@angular/core';
import { BiensService } from '../biens.service';
import { EmpruntService } from '../../emprunt/emprunt.service'
import { MembresService } from '../../membres/membres.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MesCookies } from '../../mesCookies';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-fiche-bien',
  templateUrl: './fiche-bien.component.html',
  styleUrls: ['./fiche-bien.component.css']
})
export class FicheBienComponent implements OnInit {

  private proprietaire: any;
  private userMail: String;
  private information: any;
  private membre: Object[];


  constructor(private mesCookies: MesCookies, private router: Router,
    private biensService: BiensService,
    private empruntService : EmpruntService,
    private membresService : MembresService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var self = this;
    this.userMail = this.mesCookies.getUserMail();
    let monSubscribe = this.route.params.subscribe(function(params: Params) {
      self.biensService.getAllInformationBien(params.id).subscribe(res => {
        self.information = res[0];
        self.proprietaire = self.information.listeMembres[0];
        self.membresService.getMembres("/email/" + self.mesCookies.getUserMail()).subscribe(res => self.membre = res[0]);
      });
    });
  }

  emprunt() {
      this.empruntService.empruntBien(this.information._id, this.userMail).subscribe(res => {
          this.biensService.getAllInformationBien(this.information._id).subscribe(res => {
            this.information['derniereUtilisation'] = res[0]['derniereUtilisation'];
      })});
  }

  versBiens() {
    this.router.navigate(['listeBien']);
  }

}
