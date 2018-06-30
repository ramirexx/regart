import { Component, OnInit, ViewChild } from '@angular/core';
//import { Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { FormularioService } from '../servicios/formulario.service';
import { Artista } from '../modelo/artista.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { HojaDeVidaComponent } from '../hoja-de-vida/hoja-de-vida.component';

@Component({
  selector: 'app-colectivo',
  templateUrl: './colectivo.component.html',
  styleUrls: ['./colectivo.component.css']
})
export class ColectivoComponent implements OnInit {

  tipoForm: string = "COL";

  artForm: any;
  artista: Artista = new Artista();

  //calendario idioma;
  es: any;
  qr: string = "Ministerio de culturas";
  renovacion: boolean;
  private base64Foto: String = "";
  year: any;
  provincia = { DepProv: null, Prov: null, IdProv: null, Provincia: null}
  ci : string;

  //listas
  departamentos: any[];
  provincias: any[];
  municipios: any[];
  categorias: any[];
  subSector: any[];
  actividad: any[];
  especialidad: any[];

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

  estadosCredencial = [
    "NUEVO REGISTRO",
    "RENOVACION"
  ]

  instituciones = [
    "SENAPI",
    "INSTITUCIONAL"
  ]

  rol:string;

  @ViewChild(HojaDeVidaComponent) domicilioComponent: HojaDeVidaComponent;

  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService,
    private router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {
    this.artForm = this._fb.group({

      'numero_registro': [{ value: '', disabled: true }],
      'estado': [{ value: '', disabled: true }],
      'd_fecha_registro': ['', Validators.required],
      'd_fecha_renovacion': ['', Validators.required],

      'estado_credencial': ['', Validators.required],
      'id_dpto': [{ value: '' }, Validators.required],
      'd_provincia': [{ value: '' }, Validators.required],
      'd_municipio': [{ value: '' }, Validators.required],
      //'d_comunidad': [{ value: '' }, Validators.required],
      'd_denominacion': [{ value: '' }, Validators.required],
      'd_representantes': [{ value: '' }, Validators.required],

      'id_sector': [{ value: '' }, Validators.required],
      'id_sub_sector': [{ value: '' }, Validators.required],
      'id_actividad': [{ value: '' }, Validators.required],

      'institucion': [{ value: '' }, Validators.required],
      'eta': [{ value: '' }, Validators.required],
      'acreditacion': [{ value: '' }, Validators.required],
      
      'd_nom_rep_legal': [{ value: '' }, Validators.required],
      'd_ape_rep_legal': [{ value: '' }, Validators.required],
      'd_cedula_rep_legal': [{ value: '' }, Validators.required],
      'd_exp': [{ value: '' }, Validators.required],

      'd_lugar_nac_rep_legal': [{ value: '' }, Validators.required],
      'd_fecha_nac_rep_legal': ['', Validators.required],
      'd_dom_rep_legal': [{ value: '' }, Validators.required],
      
      'd_telefono_grupo': [{ value: '' }, Validators.required],
      'd_celular_grupo': [{ value: '' }, Validators.required],
      'd_email_grupo': [{ value: '' }, Validators.required],
      
      'd_logo_grupo': [''],

      'zz': [{ value: '', disabled: false }]


    });
  }

  ngOnInit() {

    this.rol = localStorage.getItem('rol');

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
          this.formularioService.getFormColectivo(id)
            .subscribe(data => {
              this.artista = data;
              this.artista.numero_registro = this.artista.numero_registro+"-"+id 
              this.base64Foto = this.artista.d_logo_grupo;
              this.formularioService.getProvincias(this.artista.id_dpto)
              .subscribe(data => {
                let res: any = data
                if (res.length > 0) {
                  this.provincias = res
                  for (let i = 0; i < this.provincias.length; i++) {
                    let p = this.provincias[i];
                    if(p.IdProv = this.artForm.id_prov)
                    console.log("uuuuuu",p.Provincia)
                  }
                } else {
                  this.provincias = [];
                }
              });
              
            
              //this.provincia.Provincia = this.provincias[this.provincias.map(function (e) { return e.IdProv; }).indexOf(this.provincia.Provincia.IdProv)];
              this.provincia = { DepProv: this.artista.dptoProv, 
                                Prov: this.artista.prov,
                                IdProv: this.artista.id_prov,
                                Provincia: null}
              console.log("00000",this.provincia)
              this.onselectMunicipio(this.provincia);
              
              console.log("222222222222222",this.provincia.Provincia)
              
              if (this.artista.d_fecha_registro != null) {
                this.artista.d_fecha_registro = new Date(this.artista.d_fecha_registro);
                console.log("---->" + this.artista.d_fecha_registro);
              }
              if (this.artista.d_fecha_renovacion != null) {
                this.artista.d_fecha_renovacion = new Date(this.artista.d_fecha_renovacion);
                console.log("---->" + this.artista.d_fecha_renovacion);
              }
              if (this.artista.d_fecha_nac_rep_legal != null) {
                this.artista.d_fecha_nac_rep_legal = new Date(this.artista.d_fecha_nac_rep_legal);
                console.log("---->" + this.artista.d_fecha_renovacion);
              }
            })
        });
      }
    })
  }

  onselectDepartamento(objSelected) {
    //this.artista.id_mun = null;
    //this.artista.id_prov = null;
    console.log(objSelected)
    if (objSelected != undefined) {
      this.formularioService.getProvincias(objSelected)
        .subscribe(data => {
          let res: any = data
          if (res.length > 0) {
            this.provincias = res
          } else {
            this.provincias = [];
            alert("DEPARTAMENTO:"+res.msg)
            console.log("DEPARTAMENTO",data)
          }
        },
          err => console.log(err)
        );
    }
  }

  onselectMunicipio(objSelected) {
    console.log("11111",objSelected)
    if (objSelected != undefined) {
      //this.artista.id_prov = objSelected.IdProv;
      console.log(objSelected.IdProv, objSelected.Prov)
      this.artista.id_prov = objSelected.IdProv;
      this.artista.dptoProv = objSelected.DepProv;
      this.artista.prov = objSelected.Prov;
      //this.formularioService.getMunicipios(objSelected, this.artista.id_dpto)
      this.formularioService.getMunicipios(objSelected.Prov , objSelected.DepProv)
        .subscribe(data => {
          let res: any = data
          if (res.length > 0) {
            this.municipios = res
          } else {
            this.municipios = [];
            //alert("MUNICIPIO CAMPO VACIO")
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
    /*this.formularioService.saveColectivo(this.artista).subscribe(response => {
      console.log(response.ok + "--" + response.body);
    }, err => {
      console.log("error", err);
    });*/
    this.artista.numero_registro = "MDCyT" + this.year + "C";
    this.artista.estado = "BORRADOR";
    if (this.artista.id_colectivo == null) {
      this.formularioService.saveColectivo(this.artista).subscribe(response => {
        console.log(response);
        //this.artista.numero_registro = 
        if (response.status == "Success") {
          alert("Datos Registrados, Formulario:" + this.artista.numero_registro);
          this.artista.id_colectivo = response.data;
          console.log(this.artista.id_colectivo)
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
      this.artista.numero_registro = this.artista.numero_registro+"-"+this.artista.id_colectivo;
      this.formularioService.updateColectivo(this.artista.id_colectivo, this.artista).subscribe(response => {
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

    this.artista.d_logo_grupo = this.base64Foto
    console.log(btoa(binaryString));
  }

  display: boolean = false;

    showDialog() {
      //if(this.artista.id_individual != null){
        this.display = true;
      /*}else{
        alert("Por favor guarde primero el fomulario")
      }*/
        
        //this.formularioService.setCi(this.ci)
    }

    closeDialog(){
      this.display = false
    }

    cancel() {
      let link = ['home/listado-colectivos/'];
      this.router.navigate(link);
    }





}
