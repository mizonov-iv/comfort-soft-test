import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LibraryListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-search-app';
}
