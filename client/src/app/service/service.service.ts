import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';

@Injectable()
export class ServiceService {

  constructor(private http: HttpClient) { }

  getService(parametres): Observable<any> {
    return this.http.get("http://localhost:8888/utilisations" + parametres);
  }

  reservationService(idCompetence, emailUtilisateur, date, heureD, heureF): Observable<any> {
    let url = "http://localhost:8888/add/utilisation";
    let data = {
      "ID_comp_bien": idCompetence,
      "email": emailUtilisateur,
      "type": "competence",
      "date": date,
      "heureD": heureD,
      "heureF": heureF
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, data, httpOptions);
  }

  updateService(id, statut, emailUtilisateur = null, emailFournisseur = null): Observable<any> {
    let url = "http://localhost:8888/update/utilisation/" + id;
    let data = {"statut": statut, "emailUtilisateur": emailUtilisateur, "emailFournisseur": emailFournisseur};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(url, data, httpOptions);
  }

  deleteService(id): Observable<any> {
    let url = "http://localhost:8888/delete/utilisation/" + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete(url, httpOptions);
  }

  remboursement(email): Observable<any> {
    let url = "http://localhost:8888/update/utilisation/remboursement/" + email;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(url, httpOptions);
  }
}
