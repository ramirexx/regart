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

  constructor(private formularioService: FormularioService,
    private router: Router) { }

  ngOnInit() {
    this.formularioService.getArtistasIndividual()
      .subscribe(artistas => {
      this.listaIndividual = artistas
        console.log(this.listaIndividual);
      });
  }

  ver(id: string) {
    let link = ['home/ver-artista/' + id];
    console.log(link)
    this.router.navigate(link);

  }

  

}
