import { Component, OnInit } from '@angular/core';
import {BiensService} from '../biens.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MesCookies} from '../../mesCookies';

@Component({
  selector: 'app-biens',
  templateUrl: './biens.component.html',
  styleUrls: ['./biens.component.css']
})
export class BiensComponent implements OnInit {

    private biens: Object[];

    private userMail : String;
    private isAuth : boolean = false;
    private params : Params;

    constructor(private mesCookies:MesCookies,private router : Router,
        private biensService : BiensService,
        private route : ActivatedRoute) { }

    ngOnInit() {

        this.userMail=this.mesCookies.getUserMail();
        this.isAuth=this.mesCookies.getIsAuth();
        /*this.route.params.subscribe(function(params:Params){
            console.log(params.email);

            if(params.email!=""){
                  this.userMail=params.email;
                  this.isAuth=true;
              }
          console.log(this.userMail);*/



        //recuperation des données de la route :

        //-------------------------------------
        if (this.userMail != ""){
        console.log(this.userMail);
        this.biensService.getBiens("/avecUtilisations/identifie/"+this.userMail).subscribe(res => this.biens = res);
    } else {
        this.biensService.getBiens("/avecUtilisations").subscribe(res => this.biens = res);
    }

    }

    versMesBiens(){
        // Rajouter le mail de l'utilisateur
        this.router.navigate(['mesBiens']);
    }


    inscription(id){
        this.router.navigate(['ficheBien',id]);
    }

}
