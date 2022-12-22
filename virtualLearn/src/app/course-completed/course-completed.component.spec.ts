import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCompletedComponent } from './course-completed.component';

describe('CourseCompletedComponent', () => {
  let component: CourseCompletedComponent;
  let fixture: ComponentFixture<CourseCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
