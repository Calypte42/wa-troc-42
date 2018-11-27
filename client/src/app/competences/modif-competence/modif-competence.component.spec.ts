import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifCompetenceComponent } from './modif-competence.component';

describe('ModifCompetenceComponent', () => {
  let component: ModifCompetenceComponent;
  let fixture: ComponentFixture<ModifCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
