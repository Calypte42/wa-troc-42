import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recherche-membre',
  templateUrl: './recherche-membre.component.html',
  styleUrls: ['./recherche-membre.component.css']
})
export class RechercheMembreComponent implements OnInit {
  private membres: Object[];

  constructor() { }

  ngOnInit() {
  }

}
