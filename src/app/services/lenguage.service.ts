import { Injectable } from '@angular/core';
import { TranslationService, Language } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translationService: TranslationService) {}

  getLang() {
    return this.translationService.getLang();
  }

  setLang(lang: Language) {
    this.translationService.setLang(lang);
  }

  getCurrentLangFromUrl(): Language | null {
    return this.translationService.getCurrentLangFromUrl();
  }

  getRoute(path: string): string {
    return this.translationService.getRoute(path);
  }

  translate(key: string, params?: { [key: string]: string }): string {
    return this.translationService.translate(key, params);
  }

  // Alias para usar en templates
  t(key: string): string {
    return this.translationService.translate(key);
  }
}