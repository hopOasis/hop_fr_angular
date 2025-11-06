import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRaitingComponent } from './filter-raiting.component';

describe('FilterRaitingComponent', () => {
  let component: FilterRaitingComponent;
  let fixture: ComponentFixture<FilterRaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterRaitingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
