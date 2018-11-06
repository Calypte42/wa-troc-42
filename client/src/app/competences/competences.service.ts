import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {RequestOptions} from '@angular/http';

@Injectable()
export class CompetencesService {

  constructor(private http: HttpClient) { }

  getCompetences(parametres): Observable<any> {
     let observable: Observable<any>;
     return this.http.get("http://localhost:8888/competences"+parametres);
  }


  putCompetence(descriptif,mots_clefs,email,disponibilite): Observable<any>{
      let url="http://localhost:8888/add/competence";
      let data={"descriptif":descriptif,"motsCle":mots_clefs,"email":email,
                "disponibilite":disponibilite};

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };

    console.log("Je suis le service competence : \n mes donnees sont : "+JSON.stringify(data));

      return this.http.post(url,data,httpOptions);
  }



}
