import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPhotographerComponent } from './navbar-photographer.component';

describe('NavbarPhotographerComponent', () => {
  let component: NavbarPhotographerComponent;
  let fixture: ComponentFixture<NavbarPhotographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPhotographerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
