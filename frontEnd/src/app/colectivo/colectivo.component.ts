import { Component, OnInit } from '@angular/core';
//import { Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import {FormularioService} from '../servicios/formulario.service';
import { Artista } from '../modelo/artista.model';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';

@Component({
  selector: 'app-colectivo',
  templateUrl: './colectivo.component.html',
  styleUrls: ['./colectivo.component.css']
})
export class ColectivoComponent implements OnInit {

  artForm: any;
  artista: Artista= new Artista();

  //calendario idioma;
  es: any;

  //listas
  departamentos = [{ codigo: 1, descripcion: 'Chuquisaca' },
                   { codigo: 2, descripcion: 'La Paz' },
                   { codigo: 3, descripcion: 'Cochabamaba' },
                   { codigo: 4, descripcion: 'Oruro' },
                   { codigo: 5, descripcion: 'Potosi' },
                   { codigo: 6, descripcion: 'Tarija' },
                   { codigo: 7, descripcion: 'Santa Cruz' },
                   { codigo: 8, descripcion: 'Beni' },
                   { codigo: 9, descripcion: 'Pando' }]
  categorias: any[];

  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService
    ) { 
    this.artForm = this._fb.group({
      //'seltipoOperacion': [{ value: '' }, Validators.required],
      //'ci_usuarios': [{ value: ''}, Validators.required],
      //'d_modificador': [{ value: '', }, Validators.required],
      //'gestion': [{ value: '' }, Validators.required],
      'd_fecha': ['', Validators.required],
      'id_dpto': [{ value: '' }, Validators.required],
      'd_provincia': [{ value: '' }, Validators.required],
      'd_municipio': [{ value: '' }, Validators.required],
      'd_comunidad': [{ value: '' }, Validators.required],
      'd_denominacion': [{ value: '' }, Validators.required],
      'd_representantes': [{ value: '' }, Validators.required],
      'd_nom_rep_legal': [{value: ''}, Validators.required],
      'd_ape_rep_legal': [{value: ''}, Validators.required],
      'd_cedula_rep_legal': [{value: ''}, Validators.required],
      'd_exp': [{value: ''}, Validators.required],
      'd_lugar_nac_rep_legal': [{value: ''}, Validators.required],
      'd_fecha_nac_rep_legal': [{value: ''}, Validators.required],
      'd_dom_rep_legal': [{value: ''}, Validators.required],
      'd_telefono_grupo': [{value: ''}, Validators.required],
      'd_celular_grupo': [{value: ''}, Validators.required],
      'd_email_grupo': [{value: ''}, Validators.required],
      'id_cat': [{value: ''}, Validators.required],
      'id_sub_cat': [{value: ''}, Validators.required],
      'd_especialidad_grupo': [{value: ''}, Validators.required],
      'd_antecedentes_grupo': [{value: ''}, Validators.required],
      'd_biografia_grupo': [{value: ''}, Validators.required],
      'id_estado': [{value: ''}, Validators.required],
      'id_doc_resp': [{value: ''}, Validators.required],/*
      'd_doc_respaldo': [{value: ''}, Validators.required],
      'd_logo_grupo': [{value: ''}, Validators.required],*/
      

  });
  }

  ngOnInit() {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }

  this.formularioService.getCategorias()
  .subscribe(data => {this.categorias = data},
  err => console.log(err),
()=>console.log("done loanding",this.categorias));
      
    
  }

}
