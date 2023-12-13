import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  showMenu = false;
  @Input() icon = 'three-dots';
  @Input() iconSize = 16;
  @Input() items: any[] = [];
  @Input() selector = '';

  @Output() item_changed = new EventEmitter<any>();

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef<HTMLDivElement>;

  @HostListener('window:click')
  clickOutside() {
    this.showMenu = false;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  toggleDropdown(e: any) {
    e.stopImmediatePropagation();
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      const ltr = this.document.dir === 'ltr';
      let left = ltr ? e.clientX - 110 : e.clientX;
      this.dropdownMenu.nativeElement.style.top = e.clientY + 15 + 'px';
      this.dropdownMenu.nativeElement.style.left = left + 'px';
    }
  }
}
