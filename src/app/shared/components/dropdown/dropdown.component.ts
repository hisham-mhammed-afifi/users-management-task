import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface MenuItem {
  label: string;
  value: number;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  showList = false;
  selectedItem: MenuItem = <MenuItem>{};

  @Input() label = '';
  @Input() items: MenuItem[] = [];
  @Input() position = '';

  @Output() selected_item = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.selectedItem = this.items[0];
  }

  itemChange(item: any) {
    this.selectedItem = item;
    this.selected_item.emit(this.selectedItem);
  }
}
