import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';

@Component({
  selector: 'app-inscription-membre',
  templateUrl: './inscription-membre.component.html',
  styleUrls: ['./inscription-membre.component.css']
})
export class InscriptionMembreComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
      let url="http://localhost:8888/add/membre";
      let data={}
    console.log(form.value);
}

}
