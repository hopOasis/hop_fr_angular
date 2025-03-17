import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSpinnerComponent } from './small-spinner.component';

describe('SmallSpinnerComponent', () => {
  let component: SmallSpinnerComponent;
  let fixture: ComponentFixture<SmallSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
