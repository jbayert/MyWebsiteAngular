import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpireComponent } from './empire.component';

describe('EmpireComponent', () => {
  let component: EmpireComponent;
  let fixture: ComponentFixture<EmpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
