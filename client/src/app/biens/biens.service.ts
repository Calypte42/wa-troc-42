import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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

  putBien(email, descriptif, type, mots_clefs, photo, prix_neuf): Observable<any>{
      let url="http://localhost:8888/add/bien";
      let data={"email":email, "descriptif":descriptif, "type":type,
                "mots_clefs":mots_clefs,"photo":photo,"prix_neuf":prix_neuf};

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
