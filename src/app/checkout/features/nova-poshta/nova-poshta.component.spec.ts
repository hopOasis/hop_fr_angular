import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPoshtaComponent } from './nova-poshta.component';

describe('NovaPoshtaComponent', () => {
  let component: NovaPoshtaComponent;
  let fixture: ComponentFixture<NovaPoshtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaPoshtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaPoshtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
