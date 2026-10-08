import { Injectable } from '@angular/core';
import { TranslationService, Language } from './translation.service';

@Injectable({
  providedIn: 'root',
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

  // ✅ NUEVO: Obtener la ruta del CV según idioma
  getCvPath(): string {
    const lang = this.getLang()();
    return lang === 'en'
      ? 'assets/Documents/Isaac Salazar Molina – Resume (English).pdf'
      : 'assets/Documentos/Isaac Salazar Molina – CV (Español).pdf';
  }

  // ✅ NUEVO: Obtener el nombre del archivo al descargar
  getCvFileName(): string {
    const lang = this.getLang()();
    return lang === 'en' ? 'Isaac Salazar Molina – Resume (English).pdf' : 'Isaac Salazar Molina – CV (Español).pdf';
  }
}
