import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  showMenu = false;
  @Input() items: any[] = [];
  @Input() position = '';

  @Output() item_changed = new EventEmitter<any>();

  @HostListener('window:click')
  clickOutside() {
    this.showMenu = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
