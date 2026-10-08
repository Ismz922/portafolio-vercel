import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/lenguage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  private languageService = inject(LanguageService);
  
  isMenuOpen = false;
  isScrolled = false;
  currentLang = this.languageService.getLang();

  ngOnInit() {
    const urlLang = this.languageService.getCurrentLangFromUrl();
    if (urlLang) {
      this.currentLang.set(urlLang);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:popstate', [])
  onPopState() {
    const urlLang = this.languageService.getCurrentLangFromUrl();
    if (urlLang) {
      this.currentLang.set(urlLang);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  changeLanguage(lang: string) {
    this.languageService.setLang(lang as 'es' | 'en');
    this.closeMenu();
  }

  getRoute(path: string): string {
    return this.languageService.getRoute(path);
  }

  t(key: string): string {
    return this.languageService.translate(key);
  }

    getCvPath(): string {
    return this.languageService.getCvPath();
  }

  // ✅ NUEVO: Nombre del archivo al descargar
  getCvFileName(): string {
    return this.languageService.getCvFileName();
  }
}