import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContent } from './new-content';

describe('NewContent', () => {
  let component: NewContent;
  let fixture: ComponentFixture<NewContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
