import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegistroComponent } from './registro/index';
import { Auth } from './auth/index';

export const appRoutes: Routes = [
    
    { path: '', component: HomeComponent, canActivate: [Auth] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }