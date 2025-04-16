import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsSectionComponent } from './proposals-section.component';

describe('ProposalsSectionComponent', () => {
  let component: ProposalsSectionComponent;
  let fixture: ComponentFixture<ProposalsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
