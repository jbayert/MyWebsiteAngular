import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersJoinedComponent } from './players-joined.component';

describe('PlayersJoinedComponent', () => {
  let component: PlayersJoinedComponent;
  let fixture: ComponentFixture<PlayersJoinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersJoinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
