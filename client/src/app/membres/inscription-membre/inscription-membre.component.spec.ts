import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionMembreComponent } from './inscription-membre.component';

describe('InscriptionMembreComponent', () => {
  let component: InscriptionMembreComponent;
  let fixture: ComponentFixture<InscriptionMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
