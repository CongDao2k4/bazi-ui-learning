import { Component } from '@angular/core';
import { NavigateBar } from '../../assemble-component/navigate-bar/navigate-bar';
import { ItemContent } from "../../assemble-component/item-content/item-content";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [NavigateBar, ItemContent],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage {

}
