import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ici a chaque angular va creer un nouveau fichier javascript alors un component charger 
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page').then(
        (m) => m.LandingPage
      ),
  },
  {
    path: 'snapFaces',
    loadComponent: () =>
      import('./face-snaps/components/face-snap-list/face-snap-list').then(
        (m) => m.FaceSnapList
      ),
  },
  {
    path: 'snapFaces/:id',
    loadComponent: () =>
      import('./face-snaps/components/Single-face-snap/single-face-snap').then(
        (m) => m.SingleFaceSnap
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./face-snaps/components/new-face-snap/new-face-snap').then(
        (m) => m.NewFaceSnap
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
