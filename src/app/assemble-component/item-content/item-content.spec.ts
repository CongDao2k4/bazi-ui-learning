import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ItemContent } from './item-content';

describe('ItemContent', () => {
  let component: ItemContent;
  let fixture: ComponentFixture<ItemContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemContent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
