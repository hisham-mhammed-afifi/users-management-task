import { Component, Input, OnInit } from '@angular/core';
import { LoaderType } from '../../models/LoadersType.enum';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent implements OnInit {
  LoaderType = LoaderType;
  @Input() type: LoaderType = LoaderType.Line;
  @Input() count: number = 1;

  constructor() {}

  ngOnInit(): void {}
}
