import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: '/es', pathMatch: 'full' },
  { path: 'es', component: HomeComponent },
  { path: 'es/projects', component: ProjectsComponent },
  { path: 'es/contact', component: ContactComponent },
  { path: 'en', component: HomeComponent },
  { path: 'en/projects', component: ProjectsComponent },
  { path: 'en/contact', component: ContactComponent },
  { path: '**', redirectTo: '/es' }
];