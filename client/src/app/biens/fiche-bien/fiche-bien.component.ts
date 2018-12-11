import { Component, OnInit } from '@angular/core';
import {BiensService} from '../biens.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MesCookies} from '../../mesCookies';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-fiche-bien',
  templateUrl: './fiche-bien.component.html',
  styleUrls: ['./fiche-bien.component.css']
})
export class FicheBienComponent implements OnInit {

    private proprietaire : any;
    private userMail : String;
    private information : any;


  constructor(private mesCookies:MesCookies,private router : Router,
      private biensService : BiensService,
      private route : ActivatedRoute) { }

  ngOnInit() {
      var self = this;
      this.userMail = this.mesCookies.getUserMail();
      let monSubscribe = this.route.params.subscribe(function(params:Params){
          //self.id=params.id;
          self.biensService.getAllInformationBien(params.id).subscribe(res => {
              self.information = res[0];
              console.log("resultat : "+JSON.stringify(self.information));
              console.log(self.information.listeMembres[0]);
              self.proprietaire=self.information.listeMembres[0];
         });
     });

  }

  versBiens(){
      this.router.navigate(['listeBien']);
  }

}
