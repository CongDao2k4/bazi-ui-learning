import { Component, signal } from '@angular/core';
import { NavigateBar } from "../../assemble-component/navigate-bar/navigate-bar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemContent } from "../../assemble-component/item-content/item-content";

import { RelativeItem } from "../../assemble-component/relative-item/relative-item";

@Component({
  selector: 'app-new-content',
  imports: [NavigateBar, CommonModule, FormsModule, ItemContent, RelativeItem],
  templateUrl: './new-content.html',
  styleUrl: './new-content.css',
})
export class NewContent {
  searchState = signal<any>(null);

  onSearch(data: any) {
    this.searchState.set(data);
  }
}
