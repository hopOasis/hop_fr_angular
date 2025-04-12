import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSectionComponent } from './faq-section.component';

describe('FaqSectionComponent', () => {
  let component: FAQSectionComponent;
  let fixture: ComponentFixture<FAQSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FAQSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FAQSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
