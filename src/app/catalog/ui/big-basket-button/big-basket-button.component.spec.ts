import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBasketButtonComponent } from './big-basket-button.component';

describe('BigBasketButtonComponent', () => {
  let component: BigBasketButtonComponent;
  let fixture: ComponentFixture<BigBasketButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigBasketButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigBasketButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
