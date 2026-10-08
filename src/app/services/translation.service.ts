import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { Router } from '@angular/router';

export type Language = 'es' | 'en';

export interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang: WritableSignal<Language> = signal<Language>('es');
  private availableLangs: Language[] = ['es', 'en'];

  // Diccionario de traducciones
  private translations: Translations = {
    // Navbar
    'nav.home': { es: 'Inicio', en: 'Home' },
    'nav.projects': { es: 'Proyectos', en: 'Projects' },
    'nav.contact': { es: 'Contacto', en: 'Contact' },
    'nav.download.cv': { es: 'Descargar CV', en: 'Download CV' },
    'nav.fullstack.dev': { es: 'FULL-STACK DEV', en: 'FULL-STACK DEV' },

    // Home - Hero
    'home.available': { es: 'Disponible para oportunidades', en: 'Available for opportunities' },
    'home.hello': { es: 'Hola, soy', en: 'Hello, I am' },
    'home.title': {
      es: 'Desarrollador Full-Stack & Analista de Datos',
      en: 'Full-Stack Developer & Data Analyst',
    },
    'home.description': {
      es: 'Estudiante de Ingeniería del Software con experiencia en JavaScript, TypeScript, Angular, Laravel y Python. Especializado en crear soluciones tecnológicas eficientes que optimizan procesos y generan valor.',
      en: 'Software Engineering student with experience in JavaScript, TypeScript, Angular, Laravel and Python. Specialized in creating efficient technological solutions that optimize processes and generate value.',
    },
    'home.view.projects': { es: 'Ver Proyectos', en: 'View Projects' },
    'home.contact.me': { es: 'Contactarme', en: 'Contact Me' },
    'home.years.study': { es: 'Años de estudio', en: 'Years of study' },
    'home.projects.done': { es: 'Proyectos realizados', en: 'Projects completed' },
    'home.technologies.mastered': { es: 'Tecnologías dominadas', en: 'Technologies mastered' },

    // Home - Skills
    'home.skills.title': { es: 'Stack Tecnológico', en: 'Tech Stack' },
    'home.skills.subtitle': { es: 'Herramientas que domino', en: 'Tools I master' },
    'home.skills.description': {
      es: 'Tecnologías con las que he trabajado en proyectos académicos y profesionales',
      en: 'Technologies I have worked with in academic and professional projects',
    },

    // Projects
    'projects.title': { es: 'Portafolio', en: 'Portfolio' },
    'projects.subtitle': { es: 'Mis Proyectos', en: 'My Projects' },
    'projects.description': {
      es: 'Proyectos que he desarrollado para resolver problemas reales, combinando tecnología y creatividad.',
      en: 'Projects I have developed to solve real problems, combining technology and creativity.',
    },
    'projects.code': { es: 'Código', en: 'Code' },
    'projects.demo': { es: 'Demo', en: 'Live Demo' },
    'projects.professional': { es: 'Proyecto Profesional', en: 'Professional Project' },
    'projects.completed': { es: 'Completado', en: 'Completed' },
    // Proyectos - Títulos
    'projects.0.title': {
      es: 'Sistema de Gestión para Taller Mecánico',
      en: 'Management System for Auto Repair Shop',
    },
    'projects.1.title': {
      es: 'Digitalización de Ventas - Pastas Roma',
      en: 'Sales Digitalization - Pastas Roma',
    },

    // Proyectos - Descripciones
    'projects.0.description': {
      es: 'Aplicación full-stack para administrar vehículos, historial de reparaciones y clientes en entorno local. Desarrollada con Angular, TypeScript, Prisma ORM y MySQL.',
      en: 'Full-stack application to manage vehicles, repair history and customers in a local environment. Developed with Angular, TypeScript, Prisma ORM and MySQL.',
    },
    'projects.1.description': {
      es: 'Módulos funcionales para el proceso de solicitudes de promociones en el área de ventas. Desarrollo con Laravel, PHP y MySQL, mejorando la eficiencia operativa.',
      en: 'Functional modules for the promotion request process in the sales area. Developed with Laravel, PHP and MySQL, improving operational efficiency.',
    },

    // Proyectos - Fechas
    'projects.0.date': {
      es: 'Ago 2025 - Dic 2025',
      en: 'Aug 2025 - Dec 2025',
    },
    'projects.1.date': {
      es: 'May 2026 - Ago 2026',
      en: 'May 2026 - Aug 2026',
    },

    // Proyectos - Tipos y Estados
    'projects.type.fullstack': {
      es: 'Full-Stack',
      en: 'Full-Stack',
    },
    'projects.status.completed': {
      es: 'Completado',
      en: 'Completed',
    },
    'projects.status.inprogress': {
      es: 'En progreso',
      en: 'In Progress',
    },

    // Contact
    'contact.title': { es: 'Contacto', en: 'Contact' },
    'contact.subtitle': { es: '¿Tienes un proyecto en mente?', en: 'Have a project in mind?' },
    'contact.description': {
      es: 'Estoy siempre abierto a nuevas oportunidades y colaboraciones. Hablemos sobre cómo puedo ayudarte.',
      en: "I am always open to new opportunities and collaborations. Let's talk about how I can help you.",
    },
    'contact.email': { es: 'Email', en: 'Email' },
    'contact.phone': { es: 'Teléfono', en: 'Phone' },
    'contact.linkedin': { es: 'LinkedIn', en: 'LinkedIn' },
    'contact.github': { es: 'GitHub', en: 'GitHub' },
    'contact.quick.response': { es: 'Respuesta rápida', en: 'Quick response' },
    'contact.quick.response.desc': {
      es: 'Respondo en menos de 24 horas',
      en: 'I reply in less than 24 hours',
    },
    'contact.connect.linkedin': { es: 'Conectar en LinkedIn', en: 'Connect on LinkedIn' },
    'contact.view.repos': { es: 'Ver repositorios', en: 'View repositories' },
    'contact.full.name': { es: 'Nombre completo', en: 'Full name' },
    'contact.email.address': { es: 'Correo electrónico', en: 'Email address' },
    'contact.message': { es: 'Mensaje', en: 'Message' },
    'contact.send': { es: 'Enviar Mensaje', en: 'Send Message' },
    'contact.required': { es: 'Campos obligatorios', en: 'Required fields' },
    'contact.secure': {
      es: 'Tu información está segura. No comparto tus datos con terceros.',
      en: 'Your information is safe. I do not share your data with third parties.',
    },
    'contact.placeholder.name': { es: 'Ej: Juan Pérez', en: 'Ex: John Doe' },
    'contact.placeholder.email': { es: 'ejemplo@correo.com', en: 'example@email.com' },
    'contact.placeholder.message': {
      es: 'Cuéntame sobre tu proyecto, idea u oportunidad...',
      en: 'Tell me about your project, idea or opportunity...',
    },

    // Notifications
    'notification.success.title': { es: '¡Mensaje enviado! 🎉', en: 'Message sent! 🎉' },
    'notification.success.message': {
      es: 'Gracias {name}, tu mensaje ha sido enviado correctamente. Te responderé en menos de 24 horas.',
      en: 'Thank you {name}, your message has been sent successfully. I will reply in less than 24 hours.',
    },
    'notification.error.title': { es: 'Error', en: 'Error' },
    'notification.error.fields': { es: 'Campos incompletos', en: 'Incomplete fields' },
    'notification.error.fields.desc': {
      es: 'Completa todos los campos.',
      en: 'Please fill all fields.',
    },
    'notification.error.email': { es: 'Email inválido', en: 'Invalid email' },
    'notification.error.email.desc': {
      es: 'Ingresa un correo válido.',
      en: 'Please enter a valid email.',
    },
    'notification.error.send': { es: 'Error al enviar', en: 'Error sending' },
    'notification.error.send.desc': {
      es: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.',
      en: 'There was a problem sending your message. Please try again.',
    },
  };

  constructor(private router: Router) {
    // Inicializar desde la URL o localStorage
    const urlLang = this.getCurrentLangFromUrl();
    if (urlLang) {
      this.currentLang.set(urlLang);
    } else {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang && this.availableLangs.includes(savedLang)) {
        this.currentLang.set(savedLang);
      }
    }

    // Guardar en localStorage cuando cambia
    effect(() => {
      localStorage.setItem('lang', this.currentLang());
    });
  }

  getLang(): WritableSignal<Language> {
    return this.currentLang;
  }

  setLang(lang: Language) {
    if (this.availableLangs.includes(lang)) {
      this.currentLang.set(lang);
      const currentUrl = this.router.url;
      const pathWithoutLang = this.removeLangFromPath(currentUrl);
      this.router.navigate([`/${lang}${pathWithoutLang}`]);
    }
  }

  getCurrentLangFromUrl(): Language | null {
    const segments = this.router.url.split('/');
    const firstSegment = segments[1] as Language;
    if (this.availableLangs.includes(firstSegment)) {
      return firstSegment;
    }
    return null;
  }

  removeLangFromPath(path: string): string {
    const segments = path.split('/');
    if (segments.length > 1 && this.availableLangs.includes(segments[1] as Language)) {
      segments.splice(1, 1);
    }
    return segments.join('/') || '/';
  }

  getRoute(path: string): string {
    const lang = this.currentLang();
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    const pathSegments = cleanPath.split('/');
    if (pathSegments.length > 1 && this.availableLangs.includes(pathSegments[1] as Language)) {
      pathSegments.splice(1, 1);
    }
    const finalPath = pathSegments.join('/');
    return `/${lang}${finalPath}`;
  }

  // Método principal de traducción
  translate(key: string, params?: { [key: string]: string }): string {
    const lang = this.currentLang();
    const translation = this.translations[key];

    if (!translation) {
      console.warn(`⚠️ Traducción no encontrada para: "${key}"`);
      return key;
    }

    let text = translation[lang] || translation['es'] || key;

    // Reemplazar parámetros
    if (params) {
      Object.keys(params).forEach((param) => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }

    return text;
  }

  // Método para traducir con parámetros
  translateWithParams(key: string, params: { [key: string]: string }): string {
    return this.translate(key, params);
  }

  // Método para usar en templates
  t(key: string): string {
    return this.translate(key);
  }

  // Verificar si está en español
  isSpanish(): boolean {
    return this.currentLang() === 'es';
  }

  // Verificar si está en inglés
  isEnglish(): boolean {
    return this.currentLang() === 'en';
  }
}
