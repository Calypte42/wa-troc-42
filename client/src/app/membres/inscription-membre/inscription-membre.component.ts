import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { MembresService } from '../membres.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-inscription-membre',
  templateUrl: './inscription-membre.component.html',
  styleUrls: ['./inscription-membre.component.css']
})
export class InscriptionMembreComponent implements OnInit {

  constructor(private http:HttpClient, private membresService:MembresService,
                private router:Router) { }

  ngOnInit() {}


  onSubmit(form: NgForm) {
      console.log(form);
      const nom = form.value['nom'];
      const prenom = form.value['prenom'];
      const email = form.value['email'];
      const mdp = form.value['password'];
      const ville = form.value['ville'];
      const adresse = form.value['adresse'];
      const telephone = form.value['telephone'];
      let retourServeur = this.membresService.putMembre(nom, prenom, email, mdp, ville, adresse, telephone).subscribe();
      console.log(retourServeur);
      this.router.navigate(['']);

  }

  retourAccueil(){
      this.router.navigate(['']);
  }

}
