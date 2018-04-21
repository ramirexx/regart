import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '.';
import { HomeRoutingModule } from './home-routing.module';
import { ListadoArtistasComponent } from './listado-artistas/listado-artistas.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, ListadoArtistasComponent]
})
export class HomeModule {}
