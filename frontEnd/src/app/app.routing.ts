import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegistroComponent } from './registro/index';
import { Auth } from './auth/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [Auth] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);