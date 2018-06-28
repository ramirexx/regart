import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Artista } from '../modelo/artista.model';
import { Router} from '@angular/router';
import {DataTable, MenuItem} from 'primeng/primeng';
import {Column, LazyLoadEvent} from 'primeng/primeng';


@Component({
  selector: 'app-listado-colectivo',
  templateUrl: './listado-colectivo.component.html',
  styleUrls: ['./listado-colectivo.component.css']
})
export class ListadoColectivoComponent implements OnInit {

  listaColectivo: Artista[];

  constructor(private formularioService: FormularioService,
    private router: Router) { }

  ngOnInit() {
    this.formularioService.getArtistasColectivo()
      .subscribe(artistas => {
      this.listaColectivo = artistas
        console.log(this.listaColectivo);
      });

  }

  ver(id: string) {
    let link = ['home/ver-artista/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  editarFormulario(id: string) {
    let link = ['home/registro-colectivo/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  enviarFormulario(id: string, estado:string="ENVIAR") {
    let link = ['home/enviar-formulario/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  verFormulario(id: string) {
    let link = ['/formulario/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  verCredencial(id: string) {
    let link = ['/credencial/' + id];
    console.log(link)
    this.router.navigate(link);
  }

}
