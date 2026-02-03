import { Component } from '@angular/core';
import { RelativeItem } from "../../assemble-component/relative-item/relative-item";
import { ItemContent } from "../../assemble-component/item-content/item-content";
import { NavigateBar } from "../../assemble-component/navigate-bar/navigate-bar";

@Component({
  selector: 'app-item-page',
  imports: [RelativeItem, ItemContent, NavigateBar],
  templateUrl: './item-page.html',
  styleUrl: './item-page.css',
})
export class ItemPage {

}
