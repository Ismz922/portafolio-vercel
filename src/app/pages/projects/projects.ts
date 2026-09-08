import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/lenguage.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent {
  private languageService = inject(LanguageService);
  
  currentImageIndex: { [key: number]: number } = {};

  modalOpen = false;
  modalImage = '';
  modalTitle = '';
  modalIndex = 0;
  modalProjectId: number | null = null;
  modalImages: string[] = [];

  projects = [
    {
      id: 0,
      title: 'Sistema de Gestión para Taller Mecánico',
      date: 'Ago 2025 - Dic 2025',
      type: 'Full-Stack',
      status: 'Completado',
      description:
        'Aplicación full-stack para administrar vehículos, historial de reparaciones y clientes en entorno local. Desarrollada con Angular, TypeScript, Prisma ORM y MySQL.',
      technologies: ['Angular', 'TypeScript', 'Prisma ORM', 'MySQL', 'Node.js'],
      github: null,
      demo: null,
      images: [
        'assets/images/projects/taller-1.jpg',
        'assets/images/projects/taller-2.jpg',
        'assets/images/projects/taller-3.jpg',
      ],
    },
    {
      id: 1,
      title: 'Digitalización de Ventas - Pastas Roma',
      date: 'May 2026 - Ago 2026',
      type: 'Full-Stack',
      status: 'Completado',
      description:
        'Módulos funcionales para el proceso de solicitudes de promociones en el área de ventas. Desarrollo con Laravel, PHP y MySQL, mejorando la eficiencia operativa.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
      github: null,
      demo: null,
      images: [
        'assets/images/projects/Roma/pastas-1.png',
        'assets/images/projects/Roma/pastas-2.png',
        'assets/images/projects/Roma/pastas-3.png',
      ],
    },
  ];

  // ✅ Método de traducción
  t(key: string): string {
    return this.languageService.translate(key);
  }

  // ✅ Método para traducir el estado
  getStatusTranslation(status: string): string {
    if (status === 'Completado') {
      return this.t('projects.completed');
    }
    return status;
  }

  // ✅ Método para traducir el tipo de proyecto
  getTypeTranslation(type: string): string {
    if (type === 'Full-Stack') {
      return 'Full-Stack';
    }
    return type;
  }

  prevImage(projectId: number, event: Event) {
    event.stopPropagation();
    const current = this.getCurrentIndex(projectId);
    const project = this.projects.find((p) => p.id === projectId);
    if (project) {
      this.currentImageIndex[projectId] =
        (current - 1 + project.images.length) % project.images.length;
    }
  }

  nextImage(projectId: number, event: Event) {
    event.stopPropagation();
    const current = this.getCurrentIndex(projectId);
    const project = this.projects.find((p) => p.id === projectId);
    if (project) {
      this.currentImageIndex[projectId] = (current + 1) % project.images.length;
    }
  }

  getCurrentIndex(projectId: number): number {
    if (this.currentImageIndex[projectId] === undefined) {
      this.currentImageIndex[projectId] = 0;
    }
    return this.currentImageIndex[projectId];
  }

  getCurrentImage(project: any): string {
    const index = this.getCurrentIndex(project.id);
    return project.images[index] || project.images[0];
  }

  hasMultipleImages(project: any): boolean {
    return project.images && project.images.length > 1;
  }

  openModal(projectId: number, imageIndex: number, event: Event) {
    event.stopPropagation();
    const project = this.projects.find((p) => p.id === projectId);
    if (project) {
      this.modalOpen = true;
      this.modalProjectId = projectId;
      this.modalTitle = project.title;
      this.modalImages = project.images;
      this.modalIndex = imageIndex;
      this.modalImage = project.images[imageIndex];
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.modalOpen = false;
    this.modalProjectId = null;
    document.body.style.overflow = 'auto';
  }

  modalPrev(event: Event) {
    event.stopPropagation();
    if (this.modalImages.length > 0) {
      this.modalIndex = (this.modalIndex - 1 + this.modalImages.length) % this.modalImages.length;
      this.modalImage = this.modalImages[this.modalIndex];
    }
  }

  modalNext(event: Event) {
    event.stopPropagation();
    if (this.modalImages.length > 0) {
      this.modalIndex = (this.modalIndex + 1) % this.modalImages.length;
      this.modalImage = this.modalImages[this.modalIndex];
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}