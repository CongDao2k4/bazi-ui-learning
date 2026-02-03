import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { RelativeItem } from './relative-item';

describe('RelativeItem', () => {
  let component: RelativeItem;
  let fixture: ComponentFixture<RelativeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelativeItem],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelativeItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
