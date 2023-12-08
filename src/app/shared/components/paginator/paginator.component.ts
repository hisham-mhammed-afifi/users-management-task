import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() itemsLength: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() current_page = new EventEmitter<number>();

  currentPage = 1;
  pagesCount = Math.ceil(this.itemsLength / this.itemsPerPage);

  get pageNumbers(): number[] {
    if (!this.itemsLength) return [];
    if (this.pagesCount <= 5) {
      return Array(this.pagesCount)
        .fill(0)
        .map((_, i) => i + 1);
    }

    let start = this.currentPage - 1;
    if (start <= 0) {
      start = 1;
    } else if (start + 3 >= this.pagesCount) {
      start = this.pagesCount - 4;
    }

    let shownPages: any[] = [start];
    for (let i = 0; i <= 3; i++) {
      if (start + i < this.pagesCount) {
        shownPages.push(start + i);
      }
    }

    if (this.currentPage < this.pagesCount - 3) {
      shownPages.push('...', this.pagesCount);
    } else {
      shownPages.push(this.pagesCount);
    }

    return shownPages;
  }

  pageChange(page: number) {
    if (page === this.currentPage) return;
    this.currentPage = page;

    this.current_page.emit(this.currentPage);
  }

  next() {
    if (!this.itemsLength) return;
    if (this.currentPage < this.pagesCount) {
      this.currentPage++;
    }

    this.current_page.emit(this.currentPage);
  }

  prev() {
    if (!this.itemsLength) return;
    if (this.currentPage > 1) {
      this.currentPage--;
    }

    this.current_page.emit(this.currentPage);
  }

  constructor() {}

  ngOnInit(): void {}
}
