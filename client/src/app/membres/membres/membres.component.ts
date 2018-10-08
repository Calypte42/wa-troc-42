import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  private membres: Object[];

  constructor(private membresService: MembresService) { }

  ngOnInit() {
     this.membresService.getMembres().subscribe(res => this.membres = res);
  }
}
