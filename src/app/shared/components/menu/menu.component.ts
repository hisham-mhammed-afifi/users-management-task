import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
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
  @Input() position = '';

  @Output() item_changed = new EventEmitter<any>();

  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  @HostListener('window:click')
  clickOutside() {
    this.showMenu = false;
  }

  constructor() {}

  ngOnInit(): void {}

  toggleDropdown(e: Event) {
    e.stopImmediatePropagation();
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      const buttonRect =
        this.dropdownButton.nativeElement.getBoundingClientRect();
      this.dropdownMenu.nativeElement.style.top = buttonRect.bottom + 'px';
      this.dropdownMenu.nativeElement.style.left = buttonRect.left - 70 + 'px';
    }
  }
}
