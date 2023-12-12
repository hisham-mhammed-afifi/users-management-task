import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { IconComponent } from './components/icon/icon.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    PaginatorComponent,
    DropdownComponent,
    CheckboxComponent,
    IconComponent,
    MenuComponent,
    ModalComponent,
    SkeletonLoaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    PaginatorComponent,
    DropdownComponent,
    CheckboxComponent,
    IconComponent,
    MenuComponent,
    ModalComponent,
    SkeletonLoaderComponent,
    // modules
    TranslateModule,
  ],
})
export class SharedModule {}
