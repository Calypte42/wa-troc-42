import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { MembresService } from '../membres.service';
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-inscription-membre',
  templateUrl: './inscription-membre.component.html',
  styleUrls: ['./inscription-membre.component.css']
})
export class InscriptionMembreComponent implements OnInit {

    private erreur : boolean =false;

  constructor(private http:HttpClient, private membresService:MembresService,
                private router:Router,  private route : ActivatedRoute) { }

  ngOnInit() {
      let self=this;
      let monSubscribe = this.route.params.subscribe(function(params:Params){
          self.erreur=params.erreur;
     });
     console.log("Vient d une redirection : " + this.erreur);
  }


  onSubmit(form: NgForm) {
      console.log(form);
      const nom = form.value['nom'];
      const prenom = form.value['prenom'];
      const email = form.value['email'];
      const mdp = form.value['password'];
      const ville = form.value['ville'];
      const adresse = form.value['adresse'];
      const telephone = form.value['telephone'];
      let self=this;
      let verificationServeur = this.membresService.getMembres("/"+email).subscribe(res =>{
          if(res.length==0){
               let retourServeur = this.membresService.putMembre(nom, prenom, email, mdp, ville, adresse, telephone).subscribe();
               this.router.navigate(['']);
          }
          else{
              self.router.navigate(['creationMembre/true']);
          }
      });


  }

  retourAccueil(){
      this.router.navigate(['']);
  }

}
