import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorInfoComponent } from './contributor-info.component';

describe('ContributorInfoComponent', () => {
  let component: ContributorInfoComponent;
  let fixture: ComponentFixture<ContributorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
