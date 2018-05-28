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
import { Router, ActivatedRoute } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { DomSanitizer } from '@angular/platform-browser';


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

  qr: string = "sdfsdfsd";
  renovacion: boolean;
  private base64Foto: String = "";
  year: any;





  imagePath: string = "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"

  //listas
  /*departamentos = [{ codigo: 1, descripcion: 'Chuquisaca' },
  { codigo: 2, descripcion: 'La Paz' },
  { codigo: 3, descripcion: 'Cochabamaba' },
  { codigo: 4, descripcion: 'Oruro' },
  { codigo: 5, descripcion: 'Potosi' },
  { codigo: 6, descripcion: 'Tarija' },
  { codigo: 7, descripcion: 'Santa Cruz' },
  { codigo: 8, descripcion: 'Beni' },
  { codigo: 9, descripcion: 'Pando' }]*/

  departamentos: any[];
  provincias: any[];
  municipios: any[];
  categorias: any[];
  subSector: any[];
  actividad: any[];
  especialidad: any[];

  generos = ['Femenino', 'Masculino']

  estadoCivil = ['Soltero', 'Casado', 'Divorciado', 'Viuda']

  documentos = [{ codigo: 1, descripcion: 'Curriculum Vitae' },
  { codigo: 2, descripcion: 'Certificado/Credencial de Institución' },
  { codigo: 3, descripcion: 'Título/Certificado Académico' },
  { codigo: 4, descripcion: 'Otros Documentos' }
  ]

  categorizacion = [{ codigo: 'Emergente', descripcion: '2 a 6 años' },
  { codigo: 'Consecuente', descripcion: '7 a 14 años' },
  { codigo: 'Consagrado', descripcion: '15 a 25 años' },
  { codigo: 'Maestro', descripcion: '25 año adelante' }
  ]

  listaCategorizacion = [
    'Emergente -- 2 a 6 años',
    'Consecuente --7 a 14 años',
    'Consagrado -- 15 a 25 años',
    'Maestro -- 25 año adelante'
  ]

  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService,
    private router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer) {

    this.artForm = this._fb.group({
      'numero_registro': [{ value: '', disabled: true }],
      'd_fecha_registro': ['', Validators.required],
      'd_fecha_renovacion': [''],
      'vigencia': [{ value: '', disabled: true }, Validators.required],

      'id_dpto': [{ value: '' }, Validators.required],
      'd_provincia': [{ value: '' }, Validators.required],
      'd_municipio': [{ value: '' }, Validators.required],

      'd_cedula': [{ value: '' }, Validators.required],
      'd_exp': [{ value: '' }, Validators.required],
      'd_sexo': [{ value: '' }, Validators.required],
      'd_nombres': [{ value: '' }, Validators.required],
      'd_apellidos': [{ value: '' }, Validators.required],
      'd_nacimiento': [{ value: '' }, Validators.required],
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
      'd_agrupaciones': [{ value: '' }, Validators.required],
      'id_sector': [{ value: '' }, Validators.required],
      'id_sub_sector': [{ value: '' }, Validators.required],
      'id_actividad': [{ value: '' }, Validators.required],
      'id_actividad_sec': [{ value: '' }],
      'id_especialidad': [{ value: '' }, Validators.required],
      'id_especialidad_sec': [{ value: '' }],
      'id_especialidad_ter': [{ value: '' }],

      'd_experiencia': [{ value: '' }, Validators.required],
      'categorizacion': [{ value: '' }, Validators.required],

      'd_foto_individual': [''],
      'id_doc_resp': [{ value: '' }, Validators.required],
      'd_doc_respaldo': [{ value: '' }, Validators.required],
      'id_estado': [{ value: '', disabled: true }]
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

    this.formularioService.getDepartamentos()
      .subscribe(data => { this.departamentos = data },
        err => console.log(err),
        () => console.log("done loanding", this.departamentos));

    let date = new Date();
    this.year = date.getFullYear();

  }

  ngAfterContentInit() {
    console.log('-ngAfterViewInit');

    this.route.params.subscribe(params => {
      //console.log("REVISION :",params);
      let id = params['id'];
      if (id == undefined) {
        console.log("NEW FORM");
      }
      else {
        setTimeout(() => {
          console.log("LOADING DATA:" + id)
          this.formularioService.getIndividual(id)
            .subscribe(data => {
              this.artista = data;
              this.artista.numero_registro = this.artista.numero_registro+"-"+id 
              this.base64Foto = this.artista.d_foto

              if (this.artista.d_fecha_nacimiento != null) {
                this.artista.d_fecha_nacimiento = new Date(this.artista.d_fecha_nacimiento);
                console.log("---->" + this.artista.d_fecha_nacimiento);
              }
              if (this.artista.d_fecha_registro != null) {
                this.artista.d_fecha_registro = new Date(this.artista.d_fecha_registro);
                console.log("---->" + this.artista.d_fecha_registro);
              }
              if (this.artista.d_fecha_renovacion != null) {
                this.artista.d_fecha_renovacion = new Date(this.artista.d_fecha_renovacion);
                console.log("---->" + this.artista.d_fecha_renovacion);
              }
            })
        });
      }
    })
  }




  onselectDepartamento(objSelected) {
    console.log(objSelected)
    if (objSelected != undefined) {
      this.formularioService.getProvincias(objSelected)
        .subscribe(data => {
          let res: any = data
          if (res.length > 0) {
            this.provincias = res
          } else {
            this.subSector = [];
            alert("DEPARTAMENTO:"+res.msg)
            console.log("DEPARTAMENTO",data)
          }
        },
          err => console.log(err)
        );
    }
  }

  onselectMunicipio(objSelected) {
    console.log(objSelected)
    if (objSelected != undefined) {
      this.formularioService.getMunicipios(objSelected)
        .subscribe(data => {
          let res: any = data
          if (res.length > 0) {
            this.municipios = res
          } else {
            this.municipios = [];
            alert("MUNICIPIO CAMPO VACIO")
            console.log("MUNICIPIO",data)
          }
        },
          err => console.log(err)
        );
    }
  }

  onselectSector(objSelected) {
    console.log(objSelected)
    if (objSelected != undefined) {
      this.formularioService.getSubSector(objSelected)
        .subscribe(data => {
          let res: any = data
          if (res.length > 0) {
            this.subSector = res
          } else {
            this.subSector = [];
            alert("SUBSECTOR CAMPO VACIO")
            console.log("SUBSECTOR",data)
          }
        },
          err => console.log(err)
        );
    }
  }
  onselectSubSector(objSelected) {
    console.log(objSelected)
    if (objSelected != undefined) {
      this.formularioService.getActividad(objSelected)
        .subscribe(data => {
          let res: any = data
          if (res.length > 0) {
            this.actividad = res
          } else {
            this.actividad = [];
            alert("ACTIVIDAD CAMPO VACIO")
            console.log("ACTIVIDAD",data)
          }
        },
          err => console.log(err)
        );
    }
  }

  onselectActividad(objSelected) {
    console.log(objSelected)
    if (objSelected != undefined) {
      this.formularioService.getEspecialidad(objSelected)
        .subscribe(data => {
          let res: any = data

          if (res.length > 0) {
            this.especialidad = res
          } else {
            this.especialidad = [];
            alert("ESPECIALIDAD CAMPO VACIO")
            console.log("ESPECIALIDAD",data)
          }
        },
          err => console.log(err)
        );
    }
  }


  public saveDraft(): void {
    this.artista.numero_registro = "MDCyT" + this.year + "I";
    this.artista.id_estado = "BORRADOR";
    if (this.artista.id_individual == null) {
      this.formularioService.saveIndividual(this.artista).subscribe(response => {
        console.log(response);
        //this.artista.numero_registro = 
        if (response.status == "Success") {
          alert("Datos Registrados, Formulario:" + this.artista.numero_registro);
          //let link = ['home/listado-artistas/'];
          //this.router.navigate(link);
        } else {
          alert("No se pudo realizar el registro!")
        }
      }, err => {
        alert("ERROR NO SE PUDO GUARDAR LOS DATOS "+err)
        console.log("error", err);
        //let link = ['home/listado-artistas/'];
        //this.router.navigate(link);
      });
    } else {
      this.formularioService.updateIndividual(this.artista.id_individual, this.artista).subscribe(response => {
        console.log(response);
        if (response.status == "Success") {
          alert("Datos Actualizados, Formulario:" + this.artista.numero_registro);
          //let link = ['home/listado-artistas/'];
          //this.router.navigate(link);
        } else {
          alert("No se pudo realizar el registro!")
        }
      }, err => {
        alert("ERROR DE ACTUALIZACION " +err)
        console.log("error", err);
        //let link = ['home/listado-artistas/'];
        //this.router.navigate(link);
      });

    }
  }

  cancel() {
    let link = ['home/listado-artistas/'];
    this.router.navigate(link);
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64Foto = btoa(binaryString);

    this.artista.d_foto = this.base64Foto
    console.log(btoa(binaryString));
  }




}
