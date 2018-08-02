import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Individual } from '../modelo/individual.model';
import { Router} from '@angular/router';
import {DataTable, MenuItem} from 'primeng/primeng';
import {Column, LazyLoadEvent} from 'primeng/primeng';


@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.component.html',
  styleUrls: ['./listado-solicitudes.component.css']
})
export class ListadoSolicitudesComponent implements OnInit {

  listaIndividual: Individual[];
  rol: any;
  ci: any;

  constructor(private formularioService: FormularioService,
    private router: Router) { }

  ngOnInit() {
    this.formularioService.getArtistasIndividualEnviado()
    .subscribe(artistas => {
    let res: any = artistas;
    if(res.length>0){
      this.listaIndividual = artistas;
    }else{
      this.listaIndividual = [];
    }
      console.log(this.listaIndividual);
    });
  }

  aprobarFormulario(id: string) {
    let link = ['home/registro-individual/' + id+'/aprobar/'+true];
    console.log(link)
    this.router.navigate(link);
  }

  verCredencial(id: string, tipo:string="ind") {
    let link = ['/credencial/' + id +'/'+ tipo];
    console.log(link)
    this.router.navigate(link);
  }

  verPerfil(id: string) {
    let link = ['/perfil-artista/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  ver(id: string) {
    let link = ['ver-artista/' + id];
    console.log(link)
    this.router.navigate(link);
  }
  
  editarFormulario(id: string) {
    let link = ['home/registro-individual/' + id];
    console.log(link)
    this.router.navigate(link);
  }

  verFormulario(id: string) {
    let link = ['/formulario/' + id];
    console.log(link)
    this.router.navigate(link);
  }
}
