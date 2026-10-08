import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { LanguageService } from './services/lenguage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    main {
      min-height: calc(100vh - 80px - 80px);
      padding-top: 80px;
    }
  `]
})
export class AppComponent {
   private languageService = inject(LanguageService);
  private titleService = inject(Title);

  constructor() {
    // ✅ Actualizar el título cuando cambia el idioma
    effect(() => {
      const lang = this.languageService.getLang()();
      const title = lang === 'en' 
        ? 'Portfolio | Isaac Salazar' 
        : 'Portafolio | Isaac Salazar';
      this.titleService.setTitle(title);
    });
  }
}