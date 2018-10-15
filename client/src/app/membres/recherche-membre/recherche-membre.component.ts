import { Component, Input } from '@angular/core';
import { MembresService } from '../membres.service';

@Component({
  selector: 'app-recherche-membre',
  templateUrl: './recherche-membre.component.html',
  styleUrls: ['./recherche-membre.component.css']
})
export class RechercheMembreComponent {
  private membres: Object[];

  @Input()
  set nomDuMembre(nom: string) {
     this.rechercheMembre(nom);
  }

  constructor(private membresService: MembresService) { }

  rechercheMembre(nom) {
     this.membresService.getMembres("/"+nom).subscribe(res => this.membres = res);  
  }

}
