import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesEmpruntComponent } from './demandes-emprunt.component';

describe('DemandesEmpruntComponent', () => {
  let component: DemandesEmpruntComponent;
  let fixture: ComponentFixture<DemandesEmpruntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandesEmpruntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
