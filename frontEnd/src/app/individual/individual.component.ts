import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { FormularioService } from '../servicios/formulario.service';
import { Individual } from '../modelo/individual.model';
import { Router} from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {

  artForm: any;
  artista: Individual = new Individual();
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

  generos = ['Femenino', 'Masculino']

  estadoCivil = ['Soltero', 'Casado', 'Divorciado', 'Viuda']

  documentos = [{ codigo: 1, descripcion: 'Curriculum Vitae' },
  { codigo: 2, descripcion: 'Acreditante Registrado' },
  { codigo: 5, descripcion: 'Certificado de Comunidad' }]

  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService,
    private router: Router) {

    this.artForm = this._fb.group({
      'numero_registro': [{ value: '' }],
      'd_fecha_registro': ['', Validators.required],
      'd_fecha_renovacion': [''],
      'id_dpto': [{ value: '' }, Validators.required],
      'd_provincia': [{ value: '' }, Validators.required],
      'd_municipio': [{ value: '' }, Validators.required],
      'd_cedula': [{ value: '' }, Validators.required],
      'd_exp': [{ value: '' }, Validators.required],
      'd_sexo': [{ value: '' }, Validators.required],
      'd_nombres': [{ value: '' }, Validators.required],
      'd_apellidos': [{ value: '' }, Validators.required],
      'd_lugar_nacimiento': [{ value: '' }, Validators.required],
      'd_fecha_nacimiento': ['', Validators.required],
      'd_estado_civil': [{ value: '' }, Validators.required],

      'd_nro_hijos': [{ value: '' }, Validators.required],
      'd_profesion': [{ value: '' }, Validators.required],
      'd_domicilio': [{ value: '' }, Validators.required],
      'd_telefono': [{ value: '' }, Validators.required],
      'd_celular': [{ value: '' }, Validators.required],
      'd_email': [{ value: '' }, Validators.required],
      'd_pagina_web': [{ value: '' }, Validators.required],
      'd_youtube': [{ value: '' }, Validators.required],
      'd_otros': [{ value: '' }, Validators.required],

      'd_institucion': [{ value: '' }, Validators.required],
      'id_cat': [{ value: '' }, Validators.required],
      'id_sub_cat': [{ value: '' }, Validators.required],
      'id_sub_sector': [{ value: '' }, Validators.required],
      'd_actividad': [{ value: '' }, Validators.required],
      'd_producto': [{ value: '' }, Validators.required],
      'd_experiencia': [{ value: '' }, Validators.required],
      'd_ingresos': [{ value: '' }, Validators.required],
      'd_gastos': [{ value: '' }, Validators.required],
      'd_empleos_directos': [{ value: '' }, Validators.required],
      'd_empleos_indirectos': [{ value: '' }, Validators.required],
      'd_fuente_financiamiento': [{ value: '' }, Validators.required],

      'id_doc_resp': [{ value: '' }, Validators.required],
      'd_doc_respaldo': [{ value: '' }, Validators.required],
      'id_estado': [{ value: '' }, Validators.required],
      //'d_logo_grupo': [{value: ''}, Validators.required],


    });

  }

  ngOnInit() {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.formularioService.getCategorias()
      .subscribe(data => { this.categorias = data },
        err => console.log(err),
        () => console.log("done loanding", this.categorias));

  }

  public saveDraft(): void {
    this.formularioService.saveIndividual(this.artista).subscribe(response => {
      console.log(response);
      if (response.status=="Success"){
        alert("Artista Registrado");
        let link = ['/listado-artistas/'];
        this.router.navigate(link);  
    this.router.navigate(link);
      }else{
        alert("No se pudo realizar el registr!")
      }
    }, err => {
      alert(err)
      console.log("error", err);
      let link = ['home/listado-artistas/'];
      this.router.navigate(link);
    });
  }




}
