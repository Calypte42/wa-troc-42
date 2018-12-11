import { Injectable } from '@angular/core';

@Injectable()
export class MesCookies {

    private isAuth: boolean= false;
    private userMail : String = "";
    private role: String = "invit";


    constructor() { }

    /*constructor( isAuth : boolean, email:String,role : String){
                this.userMail=email;
                this.role=role;
                this.isAuth=isAuth;
            }*/


    setUserMail(email:String){this.userMail=email;}

    getUserMail(){return this.userMail;}

    setRole(role:String){this.role=role;}

    getRole(){return this.role;}

    setIsAuth(isAuth:boolean){this.isAuth=isAuth;}

    getIsAuth(){return this.isAuth}

}
