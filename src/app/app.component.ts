import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'user-management';
  currLang = localStorage.getItem('UMLANG') ?? 'en';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) {
    this.changeLang(this.currLang);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('UMLANG', lang);
    this.document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
