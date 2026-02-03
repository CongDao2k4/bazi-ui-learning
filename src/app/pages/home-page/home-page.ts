import { Component } from '@angular/core';
import { NavigateBar } from '../../assemble-component/navigate-bar/navigate-bar';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavigateBar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
