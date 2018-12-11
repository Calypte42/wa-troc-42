import { Component, OnInit } from '@angular/core';
import { BiensService } from '../biens.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MesCookies } from '../../mesCookies';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modif-bien',
  templateUrl: './modif-bien.component.html',
  styleUrls: ['./modif-bien.component.css']
})
export class ModifBienComponent implements OnInit {

  private id: String;
  private userMail: String;

  private biens: Object[];
  private bien: any = { "descriptif": "Une erreur est survenu" };

  constructor(private mesCookies: MesCookies, private router: Router,
    private biensService: BiensService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Utilise pour pouvoir acceder a this (component) dans une fonction.
    var self = this;
    this.userMail = this.mesCookies.getUserMail();
    let monSubscribe = this.route.params.subscribe(function(params: Params) {

      console.log(params.id);
      self.id = params.id;
      self.biensService.getBiens("/id/" + params.id).subscribe(res => {
        self.biens = res;
        console.log("resultat : " + JSON.stringify(res[0]));
        self.bien = res[0];
      });
    });



  }

  onSubmit(form: NgForm) {
    console.log(form);
    const descriptif = form.value['descriptif'];
    const mots_clefs = form.value['mots_clefs'];
    const type = form.value['type'];
    const photo = form.value['photo'];
    const prix_neuf = form.value['prix_neuf'];
    let retourServeur = this.biensService.updateBien(this.id, descriptif, type, mots_clefs, photo, prix_neuf).subscribe();
    console.log(retourServeur);
    let self = this;
    setTimeout(function() { self.ngOnInit() }, 900);

    //this.ngOnInit();

  }

  versMesBiens() {
    this.router.navigate(['mesBiens']);
  }
}
