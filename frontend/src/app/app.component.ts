import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule, TranslateModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  isMobileMenuOpen = false;

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('nl');
    translateService.use('nl');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
