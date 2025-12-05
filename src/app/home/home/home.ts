import { Component, inject, signal } from '@angular/core';
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
}
