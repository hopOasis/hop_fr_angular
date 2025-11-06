import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterVolumeComponent } from './filter-volume.component';

describe('FilterVolumeComponent', () => {
  let component: FilterVolumeComponent;
  let fixture: ComponentFixture<FilterVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterVolumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
