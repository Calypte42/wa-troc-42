import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class BiensService {

  constructor(private http: HttpClient) { }

  getBiens(parametres): Observable<any> {
     let observable: Observable<any>;
     observable =  this.http.get("http://localhost:8888/biens"+parametres);
     console.log("Biens" + observable);
     return observable;
  }



}
