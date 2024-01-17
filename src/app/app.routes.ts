import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CanActivate } from './auth.guard';

export const routes: Routes = [
    {
        path: 'login', title: 'Please sign in', loadComponent: () =>
            import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register', title: 'Please sign up', loadComponent: () =>
            import('./pages/register/register.component').then((m) => m.RegisterComponent)
    },
    {
        path: 'preview', title: 'Preview', canActivate: [CanActivate], loadComponent: () =>
            import('./pages/preview/preview.component').then((m) => m.PreviewComponent)
    },
    {
        path: 'profile', title: 'Profile', canActivate: [CanActivate], loadComponent: () =>
            import('./pages/profile/profile.component').then((m) => m.ProfileComponent)
    },
    { path: 'home', title: 'primelinks', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '**', title: '404 Not Found', loadComponent: () =>
            import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
    }
];
