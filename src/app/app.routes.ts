import { Routes } from '@angular/router';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { LibraryDetailComponent } from './components/library-detail/library-detail.component';

export const routes: Routes = [
  { path: '', component: LibraryListComponent },
  { path: 'library/:id', component: LibraryDetailComponent },
];
