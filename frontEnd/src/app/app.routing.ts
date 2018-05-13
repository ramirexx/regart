import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegistroComponent } from './registro/index';
import { ColectivoComponent } from './colectivo/colectivo.component';
import { IndividualComponent } from './individual/individual.component';
import { ListadoArtistasComponent } from './listado-artistas/listado-artistas.component';
import { VerIndividualComponent } from './ver-individual/ver-individual.component';
import { CredencialComponent } from './credencial/credencial.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
import { Auth } from './auth/index';

export const appRoutes: Routes = [
    
    //{ path: '', component: HomeComponent, canActivate: [Auth] },
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent,
    children:[
        { path: 'registro-colectivo', component: ColectivoComponent },
        { path: 'registro-individual', component: IndividualComponent },
        { path: 'listado-artistas', component: ListadoArtistasComponent },
        { path: 'ver-artista/:id', component: VerIndividualComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'categorias', component: CategoriasComponent },
    ]},
    { path: 'tipo-registro', component: RegistroComponent },
    { path: 'registro-individual', component: IndividualComponent },
    { path: 'registro-colectivo', component: ColectivoComponent },
    { path: 'credencial/:id', component: CredencialComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }