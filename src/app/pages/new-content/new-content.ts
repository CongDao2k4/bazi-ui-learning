import { Component } from '@angular/core';
import { NavigateBar } from "../../assemble-component/navigate-bar/navigate-bar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemContent } from "../../assemble-component/item-content/item-content";

@Component({
  selector: 'app-new-content',
  imports: [NavigateBar, CommonModule, FormsModule, ItemContent],
  templateUrl: './new-content.html',
  styleUrl: './new-content.css',
})
export class NewContent {

}
