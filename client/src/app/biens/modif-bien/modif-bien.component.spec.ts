import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifBienComponent } from './modif-bien.component';

describe('ModifBienComponent', () => {
  let component: ModifBienComponent;
  let fixture: ComponentFixture<ModifBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
