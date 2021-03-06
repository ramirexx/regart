import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule, XHRBackend,Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers,
  Http} from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { AppRoutingModule} from './app.routing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLogInterceptor} from './http-interceptor';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule }    from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/empty";



import { LocationStrategy, HashLocationStrategy,APP_BASE_HREF } from '@angular/common';

import { Auth } from './auth/index';
import { ControlMessagesComponent } from './components/control-messages';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SortableModule } from 'ngx-bootstrap/sortable';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule,MultiSelectModule,
  PanelModule, GrowlModule, CalendarModule, InputMaskModule, CheckboxModule, AutoCompleteModule,
  ConfirmDialogModule, OverlayPanelModule, TooltipModule, MenuModule, MenuItemContent,ToolbarModule,
  TabViewModule, ChartModule, RadioButtonModule
} from 'primeng/primeng';

//import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MenuItem} from 'primeng/api';

//import { QRCodeModule } from 'angular2-qrcode';
import { QRCodeModule } from 'ng-qrcode';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { ColectivoComponent } from './colectivo/colectivo.component';
import { IndividualComponent } from './individual/individual.component';
import { ListadoArtistasComponent } from './listado-artistas/listado-artistas.component';

import { FormularioService } from './servicios/formulario.service';
import { ValidationService } from './servicios/validation.service';
import { VerIndividualComponent } from './ver-individual/ver-individual.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
import { CredencialComponent } from './credencial/credencial.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PublicoComponent } from './publico/publico.component';
import { EnviarFormularioComponent } from './enviar-formulario/enviar-formulario.component';
import { HojaDeVidaComponent } from './hoja-de-vida/hoja-de-vida.component';
import { ListadoColectivoComponent } from './listado-colectivo/listado-colectivo.component';
import { PerfilArtistaComponent } from './perfil-artista/perfil-artista.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListadoSolicitudesComponent } from './listado-solicitudes/listado-solicitudes.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    ColectivoComponent,
    IndividualComponent,
    ListadoArtistasComponent,
    VerIndividualComponent,
    UsuariosComponent,
    CategoriasComponent,
    CredencialComponent,
    FormularioComponent,
    PublicoComponent,
    EnviarFormularioComponent,
    HojaDeVidaComponent,
    ListadoColectivoComponent,
    PerfilArtistaComponent,
    EstadisticasComponent,
    ListadoSolicitudesComponent,
    
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule, DataTableModule, ButtonModule, DialogModule, PanelModule, 
    CalendarModule, InputMaskModule, ConfirmDialogModule, OverlayPanelModule,
    MenuModule, ToolbarModule, TabViewModule, GrowlModule, ChartModule, RadioButtonModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    QRCodeModule
    
  ],
  providers: [
    Auth,
    FormularioService,
    ValidationService,
    {provide:LocationStrategy,  useClass: HashLocationStrategy },
    {provide: APP_BASE_HREF, useValue: '/'}
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpLogInterceptor, multi: true }  
    
    
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
