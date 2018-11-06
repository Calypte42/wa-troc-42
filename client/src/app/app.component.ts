import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'allo Voisin !';

  isAuth = false;
  userMail=null;


  modifLogIn(event){
      if(event==true){
          this.isAuth=true;
      }
      else{
          this.isAuth=false;
      }
  }

  modifUser(event){
      this.userMail=event;
  }

}
