import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { IconComponent } from './components/icon/icon.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    DropdownComponent,
    CheckboxComponent,
    IconComponent,
    MenuComponent,
    ModalComponent,
  ],
  imports: [CommonModule],
  exports: [
    PaginatorComponent,
    DropdownComponent,
    CheckboxComponent,
    IconComponent,
    MenuComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
