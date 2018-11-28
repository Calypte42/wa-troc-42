import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {RequestOptions} from '@angular/http';

import {Membre} from './membre';

@Injectable()
export class MembresService {

  constructor(private http: HttpClient) { }

  getMembres(parametres): Observable<any> {
     let observable: Observable<any>;
     observable =  this.http.get("http://localhost:8888/membres"+parametres);
     console.log(observable);
     return observable;
  }

  debloquerMembre(id):Observable<any>{
      let url="http://localhost:8888/membre/debloquerMembre/"+id;

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };
      return this.http.put(url,httpOptions);
  }

  bloquerMembre(id):Observable<any>{
      let url="http://localhost:8888/membre/bloquerMembre/"+id;
      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };
      return this.http.put(url,httpOptions);
  }


  putMembre(nom, prenom, email,mdp, ville, adresse, telephone): Observable<any>{
      let url="http://localhost:8888/add/membre";
      let data={"nom":nom,"prenom":prenom,"email":email,"mdp":mdp,"role":"user",
                "ville":ville,"adresse":adresse,"telephone":telephone};

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };

    console.log("Je suis le service : \n mes donnees sont : "+JSON.stringify(data));

      //let httpOptions = new HttpHeaders({ headers:'Content-Type':'application/json'});
     // let options = new RequestOptions({ headers: headers});
      return this.http.post(url,data,httpOptions);
  }



}
