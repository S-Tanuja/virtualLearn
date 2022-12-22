import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseHomeComponent } from './my-course-home.component';

describe('MyCourseHomeComponent', () => {
  let component: MyCourseHomeComponent;
  let fixture: ComponentFixture<MyCourseHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCourseHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCourseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
