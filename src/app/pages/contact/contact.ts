import { Component, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { LanguageService } from '../../services/lenguage.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  private languageService = inject(LanguageService);
  
  formData = {
    name: '',
    email: '',
    message: ''
  };

  showNotification = false;
  notificationType = 'success';
  notificationTitle = '';
  notificationMessage = '';
  notificationIcon = '';

  private readonly SERVICE_ID = 'service_05ja5yv';
  private readonly TEMPLATE_ID = 'template_d0y6myd';
  private readonly PUBLIC_KEY = '05-dJ0y2949ceArrb';

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  t(key: string, params?: { [key: string]: string }): string {
    return this.languageService.translate(key, params);
  }

  async sendEmail() {
    if (!this.formData.name.trim() || !this.formData.email.trim() || !this.formData.message.trim()) {
      this.mostrarNotificacion(
        'error', 
        this.t('notification.error.title'), 
        this.t('notification.error.fields.desc'), 
        'fa-exclamation-circle'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.mostrarNotificacion(
        'error', 
        this.t('notification.error.email'), 
        this.t('notification.error.email.desc'), 
        'fa-exclamation-circle'
      );
      return;
    }

    try {
      const templateParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        message: this.formData.message,
        to_name: 'Isaac Salazar'
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );

      console.log('✅ Correo enviado:', response);

      this.ngZone.run(() => {
        const successMessage = this.t('notification.success.message', { 
          name: this.formData.name 
        });
        
        this.mostrarNotificacion(
          'success',
          this.t('notification.success.title'),
          successMessage,
          'fa-check-circle'
        );
      });

      this.formData = { name: '', email: '', message: '' };

    } catch (error) {
      console.error('❌ Error al enviar:', error);
      this.ngZone.run(() => {
        this.mostrarNotificacion(
          'error',
          this.t('notification.error.send'),
          this.t('notification.error.send.desc'),
          'fa-times-circle'
        );
      });
    }
  }

  mostrarNotificacion(type: string, title: string, message: string, icon: string) {
    this.showNotification = true;
    this.notificationType = type;
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.notificationIcon = icon;

    this.cdr.detectChanges();

    setTimeout(() => {
      this.showNotification = false;
      this.cdr.detectChanges();
    }, 6000);
  }

  ocultarNotificacion() {
    this.showNotification = false;
    this.cdr.detectChanges();
  }
}