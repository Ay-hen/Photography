import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponentPhotographer} from './signup-photographer.component';

describe('SignupComponentPhotographer', () => {
  let component: SignupComponentPhotographer;
  let fixture: ComponentFixture<SignupComponentPhotographer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponentPhotographer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupComponentPhotographer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
