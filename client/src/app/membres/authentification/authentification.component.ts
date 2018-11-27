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
    /*@Input() isAuth : boolean;



    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>(true);

    @Output() changeRole : EventEmitter<String> = new EventEmitter<String>(true);*/

    @Output() changeUser : EventEmitter<String> = new EventEmitter<String>(true);

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
      this.membresService.getMembres("/authentification/"+email+"/"+password).subscribe(res => {this.resultat = res;console.log("resultat :"+res);this.login();});
      // Connexion

  }

  login(){
      if(this.resultat.length==0){
          console.log("Pas de résultat");
      }
      else{

          console.log("Avant conncexion : ");
          console.log(this.mesCookies.getUserMail());

          this.mesCookies.setIsAuth(true);
          this.mesCookies.setUserMail(this.resultat[0].email);
          this.mesCookies.setRole(this.resultat[0].role);

          this.email=this.mesCookies.getUserMail();

          this.changeUser.emit();

        /*  this.change.emit(true);

          this.changeRole.emit(this.resultat[0].role);*/
      }
      console.log("Apres conncexion : ");
      console.log(this.mesCookies.getUserMail());
      this.router.navigate(['']);
  }

  logout(){
      this.mesCookies.setIsAuth(false);
      this.mesCookies.setUserMail("");
      this.mesCookies.setRole("invit");

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
