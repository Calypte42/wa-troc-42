import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MembresService } from '../membres.service';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { Router } from '@angular/router';

import { Membre } from '../membre';
import {MesCookies} from '../../mesCookies';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

    private email: String;

    @Output() changeUser : EventEmitter<String> = new EventEmitter<String>(true);
    @Output() isAdmin : EventEmitter<Number> = new EventEmitter<Number>(true);

    private resultat:any[];

  constructor(private router:Router,private membresService : MembresService,
    private mesCookies:MesCookies) {}

  ngOnInit() {
      this.email=this.mesCookies.getUserMail();
  }

  onSubmit(form: NgForm){
      // verification
      const email = form.value["email"];
      const password = form.value["password"];
      console.log("/authentification/"+email+"/"+password);
      this.membresService.getMembres("/authentification/"+email+"/"+password).subscribe(res => {
          this.resultat = res;
          console.log("resultat :"+res);
          this.login();
      });
      // Connexion

  }

  login(){
      if(this.resultat.length==0){
          console.log("Pas de résultat");
      }
      else{

          console.log("Avant connexion : ");
          console.log(this.mesCookies.getUserMail());

          this.mesCookies.setIsAuth(true);
          this.mesCookies.setUserMail(this.resultat[0].email);
          this.mesCookies.setRole(this.resultat[0].role);
          this.mesCookies.setVille(this.resultat[0].ville);

          this.email=this.mesCookies.getUserMail();

          if(this.resultat[0].role=="admin"){
              var adminNombre=0;
              this.membresService.getMembres("/blocage").subscribe(res => {
                  adminNombre = res.length;
                  this.isAdmin.emit(adminNombre);

               });

          }
          this.changeUser.emit();

        /*  this.change.emit(true);

          this.changeRole.emit(this.resultat[0].role);*/
      }
      console.log("Apres connexion : ");
      console.log(this.mesCookies.getUserMail());
      this.router.navigate(['']);
  }

  logout(){
      this.mesCookies.setIsAuth(false);
      this.mesCookies.setUserMail("");
      this.mesCookies.setRole("invit");
      this.mesCookies.setVille("");

      this.email=this.mesCookies.getUserMail();

       this.changeUser.emit();
       /*this.change.emit(false);
       this.changeUser.emit(null);
       this.changeRole.emit(null);*/
       this.router.navigate(['']);
  }

  versCreationMembre(){
      this.router.navigate(['creationMembre']);
  }



}
