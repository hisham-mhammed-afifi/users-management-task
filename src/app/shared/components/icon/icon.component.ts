import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() icon = '';
  @Input() color = '#fff';
  @Input() size = 16;

  iconPath = 'assets/icons/icons.svg#' + this.icon;

  constructor() {}

  ngOnInit(): void {}
}
