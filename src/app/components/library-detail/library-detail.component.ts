import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-detail.component.html',
})
export class LibraryDetailComponent {
  library: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    const nav = window.history.state;
    this.library = nav.library;

    if (!this.library) {
      this.library = { name: 'Данные не загружены' };
    }
  }

  get address(): string {
    return this.library?.address?.[0]?.Address || '—';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
