import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlinkDetailsComponent } from './starlink-details.component';

describe('StarlinkDetailsComponent', () => {
  let component: StarlinkDetailsComponent;
  let fixture: ComponentFixture<StarlinkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarlinkDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarlinkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
