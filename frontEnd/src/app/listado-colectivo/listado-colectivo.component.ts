import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Colectivo } from '../modelo/colectivo.model';
import { Router} from '@angular/router';
import {DataTable, MenuItem} from 'primeng/primeng';
import {Column, LazyLoadEvent} from 'primeng/primeng';


@Component({
  selector: 'app-listado-colectivo',
  templateUrl: './listado-colectivo.component.html',
  styleUrls: ['./listado-colectivo.component.css']
})
export class ListadoColectivoComponent implements OnInit {

  listaColectivo: Colectivo[];
  listaColectivobyCi: Colectivo[];
  rol: any;
  ci: any;
  constructor(private formularioService: FormularioService,
    private router: Router) { }

  ngOnInit() {

    this.rol = localStorage.getItem('rol');
    this.ci = localStorage.getItem('ci');

    if(this.rol == 4){
      this.formularioService.getColectivobyCi(this.ci)
      .subscribe(artistas => {
      this.listaColectivobyCi = artistas
        console.log(this.listaColectivobyCi);
      });
    }else{
      this.formularioService.getArtistasColectivo()
      .subscribe(artistas => {
      this.listaColectivo = artistas
        console.log(this.listaColectivo);
      });
    }
    

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

  enviarFormulario(id: string, estado:string="ENVIAR", tipo:string="col") {
    console.log(id)
    let link = ['home/enviar-formulario/' + id + '/'+ tipo];
    console.log(link)
    this.router.navigate(link);
  }

  verFormulario(id: string) {
    let link = ['/formulario/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  verCredencial(id: string, tipo:string="col") {
    let link = ['/credencial/' + id +'/'+ tipo];
    console.log(link)
    this.router.navigate(link);
  }

}
