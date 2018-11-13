import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MembresService } from '../membres.service';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { Router } from '@angular/router';

import { Membre } from '../membre';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

    @Input() isAuth : boolean;

    @Input() email: String;

    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>(true);
    @Output() changeUser : EventEmitter<String> = new EventEmitter<String>(true);
    @Output() changeRole : EventEmitter<String> = new EventEmitter<String>(true);

    private resultat:any[];

  constructor(private router:Router,private membresService : MembresService) {}

  ngOnInit() {
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
          this.change.emit(true);
          this.changeUser.emit(this.resultat[0].email);
          this.changeRole.emit(this.resultat[0].role);
      }
  }

  logout(){
       this.change.emit(false);
       this.changeUser.emit(null);
       this.changeRole.emit(null);
  }

  versCreationMembre(){
      this.router.navigate(['creationMembre']);
  }


}
