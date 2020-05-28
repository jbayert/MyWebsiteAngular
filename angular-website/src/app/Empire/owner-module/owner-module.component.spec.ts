import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerModuleComponent } from './owner-module.component';

describe('OwnerModuleComponent', () => {
  let component: OwnerModuleComponent;
  let fixture: ComponentFixture<OwnerModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
