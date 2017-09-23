import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationHistoryCardComponent } from './location-history-card.component';

describe('LocationHistoryCardComponent', () => {
  let component: LocationHistoryCardComponent;
  let fixture: ComponentFixture<LocationHistoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationHistoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
