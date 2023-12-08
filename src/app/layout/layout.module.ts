import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LayoutComponent } from './layout.component';


@NgModule({
  declarations: [
    UsersTableComponent,
    TopBarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
