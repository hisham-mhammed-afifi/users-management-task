import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  private _iconPath = '';
  @Input() color = '#fff';
  @Input() size = 16;
  @Input() set icon(name: string) {
    this._iconPath = 'assets/icons/icons.svg#' + name;
  }

  get icon(): string {
    return this._iconPath;
  }

  constructor() {}

  ngOnInit(): void {}
}
