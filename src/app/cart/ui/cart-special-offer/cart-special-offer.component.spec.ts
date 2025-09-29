import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSpecialOfferComponent } from './cart-special-offer.component';

describe('CartSpecialOfferComponent', () => {
  let component: CartSpecialOfferComponent;
  let fixture: ComponentFixture<CartSpecialOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSpecialOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
