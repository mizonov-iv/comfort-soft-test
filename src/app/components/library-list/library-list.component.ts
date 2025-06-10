import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class LibraryListComponent implements OnInit{
  searchTerm: string = '';
  libraries: any[] = [];
  filteredLibraries: any[] = [];
  isLoading: boolean = false;
  apiKey = "89fa5065-1af6-48a0-9351-f0c112ae9a36";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
    this.fetchLibraries();
  }

  fetchLibraries() {
    this.isLoading = true;
    const url = `https://apidata.mos.ru/v1/datasets/526/rows?api_key=${this.apiKey}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.libraries = data.map(item => item.Cells)
      },
      error: (err) => {
        console.error('Ошибка загрузки библиотек:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  filterLibraries(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredLibraries = this.libraries.filter(lib =>
      lib.FullName?.toLowerCase().includes(term)
    );
  }

  highlight(text: any): SafeHtml {
    if (typeof text !== 'string' || !text.trim()) return '';

    const term = this.searchTerm.trim();
    if (!term) return text;

    const regex = new RegExp(`(${term})`, 'gi');

    const highlighted = text.replace(regex, '<span class="text-danger fw-bold">$1</span>');

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  goToDetails(lib: any) {
    this.router.navigate(['/library', lib.global_id], { state: { library: lib } });
  }
}
