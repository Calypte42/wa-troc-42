import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {RequestOptions} from '@angular/http';

@Injectable()
export class BiensService {

  constructor(private http: HttpClient) { }

  getBiens(parametres): Observable<any> {
     return this.http.get("http://localhost:8888/biens"+parametres);
  }

  putBien(email, descriptif, type, mots_clefs, photo, prix_neuf): Observable<any>{
      let url="http://localhost:8888/add/bien";
      let data={"email":email, "descriptif":descriptif, "type":type,
                "mots_clefs":mots_clefs,"photo":photo,"prix_neuf":prix_neuf};

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };

      return this.http.post(url,data,httpOptions);
  }

  deleteBien(id): Observable<any>{
      console.log("delete bien appele sur " + id);
      let url="http://localhost:8888/delete/bien/"+id;

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };

      return this.http.delete(url,httpOptions);
  }

  updateBien(id, descriptif, type, mots_clefs, photo, prix_neuf):Observable<any>{
      let url="http://localhost:8888/update/bien/"+id;
      let data={"descriptif":descriptif, "type":type,
                "mots_clefs":mots_clefs,"photo":photo,"prix_neuf":prix_neuf};
      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };
      return this.http.put(url,data,httpOptions);
  }

  getAllInformationBien(id):Observable<any>{
       return this.http.get("http://localhost:8888/membres/bien/"+id);
  }

}
