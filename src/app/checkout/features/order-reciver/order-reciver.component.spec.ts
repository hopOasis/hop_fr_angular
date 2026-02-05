import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReciverComponent } from './order-reciver.component';

describe('OrderReciverComponent', () => {
  let component: OrderReciverComponent;
  let fixture: ComponentFixture<OrderReciverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderReciverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReciverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
