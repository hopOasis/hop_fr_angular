import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeConfirmationComponent } from './age-confirmation.component';

describe('AgeConfirmationComponent', () => {
  let component: AgeConfirmationComponent;
  let fixture: ComponentFixture<AgeConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
