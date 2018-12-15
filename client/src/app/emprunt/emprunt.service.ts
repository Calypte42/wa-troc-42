import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';

@Injectable()
export class EmpruntService {

  constructor(private http: HttpClient) { }

  getEmprunt(parametres): Observable<any> {
    return this.http.get("http://localhost:8888/utilisations" + parametres);
  }

  empruntBien(idBien, emailEmprunteur): Observable<any> {
    let url = "http://localhost:8888/add/utilisation";
    let data = { "ID_comp_bien": idBien, "email": emailEmprunteur, "type": "bien" };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, data, httpOptions);
  }

  updateEmprunt(id, status, emailEmprunteur = null, emailPreteur = null): Observable<any> {
    let url = "http://localhost:8888/update/utilisation/" + id;
    let data={"status":status, "emailEmprunteur":emailEmprunteur, "emailPreteur":emailPreteur};
    const httpOptions = { headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                  })
                };
    return this.http.put(url, data, httpOptions);
  }

  deleteEmprunt(id): Observable<any>{
      let url="http://localhost:8888/delete/utilisation/"+id;

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };

      return this.http.delete(url,httpOptions);
  }

  remboursement(email): Observable<any>{
      let url="http://localhost:8888/update/utilisation/remboursement/"+email;

      const httpOptions = { headers: new HttpHeaders({
                'Content-Type':  'application/json'
              })
            };

      return this.http.put(url,httpOptions);
  }

}
