import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MesCookies} from './mesCookies';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'allo Voisin !';

    isAuth : boolean = false;
    userMail : String ="";
    role : String = "";
    adminNombre : Number = 0;

    constructor(private mesCookies:MesCookies, private router:Router){
        this.isAuth = mesCookies.getIsAuth();
        this.userMail= mesCookies.getUserMail();
        this.role = mesCookies.getRole();

    }





 /* modifLogIn(event){
      if(event==true){
          this.isAuth=true;
      }
      else{
          this.isAuth=false;
      }
  }

  modifRole(event){
      this.role=event;
  }

  */

  modifUser(){
      this.isAuth = this.mesCookies.getIsAuth();
      this.userMail= this.mesCookies.getUserMail();
      this.role = this.mesCookies.getRole();
  }

  isAdmin(event){
      this.adminNombre=event;
      console.log(this.adminNombre);
  }

  gestionEmprunts() {
      this.router.navigate(['gestionEmprunts']);
  }

  mesEmprunts() {
      this.router.navigate(['mesEmprunts']);
  }




}
