import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { MembresService } from '../membres.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import {MesCookies} from '../../mesCookies';

@Component({
  selector: 'app-modif-membre',
  templateUrl: './modif-membre.component.html',
  styleUrls: ['./modif-membre.component.css']
})
export class ModifMembreComponent implements OnInit {

  constructor(private router:Router,private membresService : MembresService,
    private mesCookies:MesCookies) { }

    private user : any= {"email":"Une erreur est survenu"};

  ngOnInit() {
      var self = this;
      let verificationServeur = this.membresService.getMembres("/email/"+this.mesCookies.getUserMail()).subscribe(res =>{
          if(res.length!=0){
              self.user=res[0];
              console.log("Je vais update les données de user : "+ JSON.stringify(self.user));
          }
          else{
             console.log("erreur dans recuperation modification membre");
          }
      });




  }

  afficheInfo(){
      console.log("BOUH222222 ::::::::: "+JSON.stringify(this.user));
  }


  onSubmit(form: NgForm) {
          const nom = form.value['nom'];
          const prenom = form.value['prenom'];
          const email = this.mesCookies.getUserMail();
          console.log("Email : "+ form.value['email'])
          const mdp = form.value['password'];
          const ville = form.value['ville'];
          const adresse = form.value['adresse'];
          const telephone = form.value['telephone'];

          let retourServeur = this.membresService.updateMembre(nom, prenom, email, mdp, ville, adresse, telephone).subscribe();
          console.log(retourServeur);

          this.mesCookies.setVille(ville);
          this.router.navigate(['']);

      //this.ngOnInit();

  }

}
