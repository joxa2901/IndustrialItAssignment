import { Component, computed, effect, inject, signal } from '@angular/core';
import { HomeService } from '../../services/home-service';
import { Announcement } from '../../model/announcement';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  homeService = inject(HomeService);
  // currentPage = 1;
  currentPage = signal(1);
  limit = signal<number>(5);
  posts = signal<Announcement[]>([]);
  pagedPosts = computed(() => {
    const start = (this.currentPage() - 1) * this.limit();
    const end = start + this.limit();
    return this.posts().slice(start, end);
  });
  totalPages = computed(() => Math.ceil(this.posts().length / this.limit()));
  relativePageNumbers = signal([0, 1, 2, 3, 4]);
  selectedTag = signal<string | null>(null);
  searchQuery = signal('');
  allTags = computed(() => {
    const data = this.homeService.announcements();
    if (!data?.posts) return [];

    const tags: string[] = [];

    for (const p of data.posts) {
      tags.push(...p.tags);
    }

    return Array.from(new Set(tags)).sort();
  });

  constructor() {
    this.homeService.getAnnouncements().subscribe((a) => {
      this.posts.set(a.posts);
    });
  }

  next() {
    this.currentPage.update((n) => n + 1);
  }

  prev() {
    this.currentPage.update((n) => Math.max(1, n - 1));
  }

  goToLastPage() {
    this.currentPage.set(this.posts().length / this.limit());
  }

  goToPage(pageNumber: number) {
    this.currentPage.set(pageNumber);
  }

  goTo(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    if (value <= this.totalPages()) {
      this.currentPage.set(value);
    } else {
      this.currentPage.set(this.totalPages());
    }
  }

  changeTag(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedTag.set(value || null);
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
