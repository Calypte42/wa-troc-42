import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MembresService {

  constructor(private http: HttpClient) { }

  getMembres(parametres): Observable<any> {
     let observable: Observable<any>;
     observable =  this.http.get("http://localhost:8888/membres"+parametres);
     console.log(observable);
     return observable;
  }

  rechercheMembres(parametre): Observable<any> {
     let observable: Observable<any>;
     observable =  this.http.get("http://localhost:8888/membres/recherche/"+parametre);
     console.log(observable);
     return observable;
  }



}
