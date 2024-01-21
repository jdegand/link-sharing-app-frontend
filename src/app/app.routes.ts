import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CanActivate } from './auth.guard';

// need to deactivate register route when logged in
// problem when navigating -> page seems to refresh -> checking the signal doesn't work
// but if you don't use "/" in front of a route -> segments don't replace each other

/*
{
    path: 'register', title: 'Please sign up', canActivate: [CanRegister], loadComponent: () =>
        import('./pages/register/register.component').then((m) => m.RegisterComponent)
},
{
    path: 'register', title: 'Please sign up', canActivate: [CanRegister], component: RegisterComponent
},
*/

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
        path: 'preview', title: 'Preview', canMatch: [CanActivate], loadComponent: () =>
            import('./pages/preview/preview.component').then((m) => m.PreviewComponent)
    },
    {
        path: 'profile', title: 'Profile', canMatch: [CanActivate], loadComponent: () =>
            import('./pages/profile/profile.component').then((m) => m.ProfileComponent)
    },
    { path: 'home', title: 'primelinks', canMatch: [CanActivate], component: HomeComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '**', title: '404 Not Found', loadComponent: () =>
            import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
    }
];
