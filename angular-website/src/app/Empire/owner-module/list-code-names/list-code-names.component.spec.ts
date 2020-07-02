import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCodeNamesComponent } from './list-code-names.component';

describe('ListCodeNamesComponent', () => {
  let component: ListCodeNamesComponent;
  let fixture: ComponentFixture<ListCodeNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCodeNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCodeNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
