import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { NavigateBar } from './navigate-bar';

describe('NavigateBar', () => {
  let component: NavigateBar;
  let fixture: ComponentFixture<NavigateBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateBar],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
