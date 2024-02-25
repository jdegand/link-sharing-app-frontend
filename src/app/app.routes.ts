import { Routes } from '@angular/router';
import { CanActivate } from './auth.guard';
import { CanRegister } from './register.guard';

export const routes: Routes = [
    {
        path: 'login', title: 'Please sign in', canActivate: [CanRegister], loadComponent: () =>
            import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register', title: 'Please sign up', canActivate: [CanRegister], loadComponent: () =>
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
    {
        path: 'links', title: 'primelinks', canActivate: [CanActivate], loadComponent: () =>
            import('./pages/links/links.component').then((m) => m.LinksComponent)
    },
    {
        path: 'public/:username/:userId', title: 'Public Profile', loadComponent: () =>
            import('./pages/public-profile/public-profile.component').then((m) => m.PublicProfileComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '**', title: '404 Not Found', loadComponent: () =>
            import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
    }
];
