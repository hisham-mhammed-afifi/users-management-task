import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { IconComponent } from './components/icon/icon.component';



@NgModule({
  declarations: [
    PaginatorComponent,
    DropdownComponent,
    CheckboxComponent,
    IconComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
