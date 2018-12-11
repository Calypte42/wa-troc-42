import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {BiensService} from '../biens.service';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {RequestOptions} from '@angular/http';

import {MesCookies} from '../../mesCookies';

@Component({
  selector: 'app-creation-bien',
  templateUrl: './creation-bien.component.html',
  styleUrls: ['./creation-bien.component.css']
})
export class CreationBienComponent implements OnInit {

    //@Input() email : String;

    constructor(private mesCookies:MesCookies,
        private http:HttpClient, private biensService:BiensService,
                  private router:Router) { }

    ngOnInit() {}


    onSubmit(form: NgForm) {
        if(this.mesCookies.getRole()!="invit"){

            console.log(form);
            const descriptif = form.value['descriptif'];
            const mots_clefs = form.value['mots_clefs'];
            const type = form.value['type'];
            const photo = form.value['photo'];
            const prix_neuf = form.value['prix_neuf'];
            let retourServeur = this.biensService.putBien(this.mesCookies.getUserMail(),descriptif,type,mots_clefs,photo,prix_neuf).subscribe();
            console.log(retourServeur);
        }
        let self=this;
        setTimeout(function(){self.router.navigate(['mesBiens'])},1000);
        //this.router.navigate(['mesCompetences']);

    }

    retourAccueil(){
        this.router.navigate(['']);
    }

}
