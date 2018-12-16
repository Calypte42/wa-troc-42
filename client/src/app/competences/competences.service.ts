import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {RequestOptions} from '@angular/http';

@Injectable()
export class CompetencesService {

  constructor(private http: HttpClient) { }

  getCompetences(parametres): Observable<any> {
     //let observable: Observable<any>;
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


  deleteCompetence(id): Observable<any>{
      console.log("delete competence appele sur " + id);
      let url="http://localhost:8888/delete/competence/"+id;
      //let data={"id":id};

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };

      return this.http.delete(url,httpOptions);
  }


  updateCompetence(id,descriptif,mots_clefs):Observable<any>{
      let url="http://localhost:8888/update/competence/"+id;
      let data={"descriptif":descriptif,"motsCle":mots_clefs};
      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };
      return this.http.put(url,data,httpOptions);
  }

  updateDisponibilite(id,nouvelleDispo):Observable<any>{
      let url="http://localhost:8888/update/disponibilite/"+id;
      let data={"disponibilite":nouvelleDispo};
      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };
      return this.http.put(url,data,httpOptions);
  }

  updateStatusDisponibilite(id,statut,date):Observable<any>{
      let url="http://localhost:8888/update/statutDisponibilite/"+id;
      let data={"statut":statut, "date":date};
      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };
      return this.http.put(url,data,httpOptions);
  }


  getAllInformationCompetence(id):Observable<any>{
       return this.http.get("http://localhost:8888/membres/competence/"+id);
  }



}
