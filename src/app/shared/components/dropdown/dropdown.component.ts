import { Component, OnInit, Input } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.selectedItem = this.items[0];
  }
}
