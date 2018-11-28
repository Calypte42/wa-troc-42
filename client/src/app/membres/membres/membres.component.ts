import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  private membres: Object[];

  constructor(private membresService: MembresService, private router : Router) { }

  ngOnInit() {
     this.membresService.getMembres("/blocage").subscribe(res => this.membres = res);
  }

  actualisation(){
      console.log("actualisation");
      this.ngOnInit();
  }


  debloquerStatus(id){
      this.membresService.debloquerMembre(id).subscribe();
  }

  bloquerStatus(id){
      this.membresService.bloquerMembre(id).subscribe();
  }


}
