import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Individual } from '../modelo/individual.model';
import { Router} from '@angular/router';
import {DataTable, MenuItem} from 'primeng/primeng';
import {Column, LazyLoadEvent} from 'primeng/primeng';

@Component({
  selector: 'app-listado-artistas',
  templateUrl: './listado-artistas.component.html',
  styleUrls: ['./listado-artistas.component.css']
})
export class ListadoArtistasComponent implements OnInit {

  listaIndividual: Individual[];
  listaIndividualbyCi: Individual[];
  rol: any;
  ci: any;

  constructor(private formularioService: FormularioService,
    private router: Router) { }

  ngOnInit() {
    
    this.rol = localStorage.getItem('rol');
    this.ci = localStorage.getItem('ci');

    if(this.rol == 4){
      this.formularioService.getIndividualbyCi(this.ci)
      .subscribe(artistas => {
      this.listaIndividualbyCi = artistas
        console.log(this.listaIndividualbyCi);
      });
    }else{
    this.formularioService.getArtistasIndividual()
      .subscribe(artistas => {
      this.listaIndividual = artistas
        console.log(this.listaIndividual);
      });
    }

  }

  ver(id: string) {
    let link = ['home/ver-artista/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  editarFormulario(id: string) {
    let link = ['home/registro-individual/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  enviarFormulario(id: string, estado:string="ENVIAR", tipo:string="ind") {
    let link = ['home/enviar-formulario/' + id +'/'+ tipo];
    console.log(link)
    this.router.navigate(link);
  }

  verFormulario(id: string) {
    let link = ['/formulario/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  verCredencial(id: string, tipo:string="ind") {
    let link = ['/credencial/' + id +'/'+ tipo];
    console.log(link)
    this.router.navigate(link);
  }

  

}
