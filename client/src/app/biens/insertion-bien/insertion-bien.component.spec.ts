import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionBienComponent } from './insertion-bien.component';

describe('InsertionBienComponent', () => {
  let component: InsertionBienComponent;
  let fixture: ComponentFixture<InsertionBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
