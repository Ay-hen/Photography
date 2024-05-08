import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerReservationComponent } from './photographer-reservation.component';

describe('PhotographerReservationComponent', () => {
  let component: PhotographerReservationComponent;
  let fixture: ComponentFixture<PhotographerReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographerReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotographerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
