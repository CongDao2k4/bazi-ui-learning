import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ItemCard } from './item-card';

describe('ItemCard', () => {
  let component: ItemCard;
  let fixture: ComponentFixture<ItemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCard],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
