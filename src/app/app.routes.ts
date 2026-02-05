import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { SearchPage } from './pages/search-page/search-page';
import { NewContent } from './pages/new-content/new-content';
import { ItemPage } from './pages/item-page/item-page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'search', component: SearchPage },
    { path: 'itempage', component: ItemPage },
    { path: 'newcontent', component: NewContent }
];