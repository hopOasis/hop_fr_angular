import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRecommendationsSectionComponent } from './team-recommendations-section.component';

describe('TeamRecommendationsSectionComponent', () => {
  let component: TeamRecommendationsSectionComponent;
  let fixture: ComponentFixture<TeamRecommendationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRecommendationsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamRecommendationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
