import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkrPoshtaComponent } from './ukr-poshta.component';

describe('UkrPoshtaComponent', () => {
  let component: UkrPoshtaComponent;
  let fixture: ComponentFixture<UkrPoshtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UkrPoshtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkrPoshtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
