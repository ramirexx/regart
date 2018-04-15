import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule, ApplicationRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import {AppRoutingModule} from './app.routing'

import { LocationStrategy, HashLocationStrategy,APP_BASE_HREF } from '@angular/common';

import { Auth } from './auth/index';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule,MultiSelectModule,
  PanelModule, GrowlModule, CalendarModule, InputMaskModule, CheckboxModule, AutoCompleteModule,
  ConfirmDialogModule, OverlayPanelModule, TooltipModule
} from 'primeng/primeng';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InputTextModule, DataTableModule, ButtonModule, DialogModule, PanelModule, 
    CalendarModule, InputMaskModule, ConfirmDialogModule, OverlayPanelModule,
  ],
  providers: [
    Auth,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
