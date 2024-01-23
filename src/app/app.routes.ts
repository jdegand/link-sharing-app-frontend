import { Routes } from '@angular/router';
import { CanActivate } from './auth.guard';

// need to deactivate register route when logged in
// can only guard against register / login when routes are a part of the navbar
// navigating by typing in the url causes the auth signal to be destroyed
// in constructor of both, I reset local storage to remove tokens so navigating to either route
// is essentially logging out and user can't access protected routes

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
    {
        path: 'links', title: 'primelinks', canActivate: [CanActivate], loadComponent: () =>
            import('./pages/links/links.component').then((m) => m.LinksComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '**', title: '404 Not Found', loadComponent: () =>
            import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
    }
];
