import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LayoutRoutingModule } from './layout-routing.module';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersTableComponent,
    TopBarComponent,
    LayoutComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class LayoutModule {}
