import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifMembreComponent } from './modif-membre.component';

describe('ModifMembreComponent', () => {
  let component: ModifMembreComponent;
  let fixture: ComponentFixture<ModifMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
