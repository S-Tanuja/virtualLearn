import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalTestCongratulationsComponent } from './final-test-congratulations.component';

describe('FinalTestCongratulationsComponent', () => {
  let component: FinalTestCongratulationsComponent;
  let fixture: ComponentFixture<FinalTestCongratulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalTestCongratulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalTestCongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
