import { Component, computed, inject, signal } from '@angular/core';
import { HomeService } from '../../services/home-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  homeService = inject(HomeService);
  currentPage = 1;
  limit = 10;
  selectedTag = signal<string | null>(null);
  allTags = computed(() => {
    const data = this.homeService.announcements();
    if (!data?.posts) return [];

    const tags: string[] = [];

    for (const p of data.posts) {
      tags.push(...p.tags);
    }

    return Array.from(new Set(tags));
  });

  constructor() {
    this.loadPage();
  }

  loadPage() {
    const skip = (this.currentPage - 1) * this.limit;
    this.homeService.getAnnouncements(this.limit, skip);
  }

  next() {
    this.currentPage++;
    this.loadPage();
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }

  changeTag(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedTag.set(value || null);
  }
}
