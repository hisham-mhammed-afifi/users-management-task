import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CONSTANTS } from 'src/environments/environment';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() itemsLength: number = 100;
  @Input() itemsPerPage: number = CONSTANTS.UsersPerPage;
  @Output() current_page = new EventEmitter<string>();

  currentPage = 1;

  get pageNumbers(): number[] {
    if (!this.itemsLength) return [];
    const pagesCount = Math.ceil(this.itemsLength / this.itemsPerPage);
    if (pagesCount <= 5) {
      return Array(pagesCount)
        .fill(0)
        .map((_, i) => i + 1);
    }

    let start = this.currentPage - 1;
    if (start <= 0) {
      start = 1;
    } else if (start + 3 >= pagesCount) {
      start = pagesCount - 4;
    }

    let shownPages: any[] = [start];
    for (let i = 1; i <= 3; i++) {
      if (start + i < pagesCount) {
        shownPages.push(start + i);
      }
    }

    if (this.currentPage < pagesCount - 3) {
      shownPages.push('...', pagesCount);
    } else {
      shownPages.push(pagesCount);
    }

    return shownPages;
  }

  pageChange(page: number) {
    if (page === this.currentPage) return;
    this.currentPage = page;

    this.current_page.emit(this.currentPage.toString());
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.itemsLength);
  }

  next() {
    if (!this.itemsLength) return;
    const pagesCount = Math.ceil(this.itemsLength / this.itemsPerPage);
    if (this.currentPage < pagesCount) {
      this.currentPage++;
    }

    this.current_page.emit(this.currentPage.toString());
  }

  prev() {
    if (!this.itemsLength) return;
    if (this.currentPage > 1) {
      this.currentPage--;
    }

    this.current_page.emit(this.currentPage.toString());
  }
}
