import { Component, OnInit, Input } from '@angular/core';
import { Resumen, Trayectoria, Curso, Formacion, Premios, Produccion, Representacion } from '../modelo/individual.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { FormularioService } from '../servicios/formulario.service';

@Component({
  selector: 'app-hoja-de-vida',
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent implements OnInit {

  @Input('master') masterName: number;
  @Input('tipo')tipo: String;

  listaResumen: any[];
  listaTrayectoria: any[];
  listaCurso: any[];
  listaFormacion: any[];
  listaPremio: any[];
  listaProduccion: any[];
  listaRepresentacion: any[];

  resumen: Resumen = new Resumen();
  trayectoria: Trayectoria = new Trayectoria();
  curso: Curso = new Curso();
  formacion: Formacion = new Formacion();
  premio: Premios = new Premios();
  produccion: Produccion = new Produccion();
  rep: Representacion = new Representacion();

  resumenForm:any;
  trayectoriaForm: any;
  cursoForm: any;
  formacionForm: any;
  premioForm: any;
  produccionForm: any;
  repForm: any;

  tipo_artista: string;
  tipo_formacion: string;

  recursos=["Presentación Musical", "Presentación Teatral", "Presentación de Danza","Presentación Escénica","Producción Audiovisual","Producción Musical","Producción de Arte","Exposición","Publicación Literaria"]
  //recursos=["Propio", "Estatal", "Apoyo Internacional","Mixta"]
  bienes=["Dramático Musicales","Descripción Escrita de Coreografía","Descripción Escrita de Pantomímicas","Composiciones Musicales con Letra","Composiciones Musicales Instrumentales","Cinematográfica","Videograma","Dibujo","Pintura","Escultura","Grabado","Litografía","Fotografía","Artes Aplicadas","Artesanía","Ilustraciones","Bocetos Escenográficos","Escenografías","Adaptaciones","Arreglos Musicales"];

  es: any;


  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService) {

      this.resumenForm = this._fb.group({
        'resumen': ['', Validators.required]
      })

      this.trayectoriaForm = this._fb.group({
      'gestion': ['', Validators.required],
      //'fecha': ['', Validators.required],
      'lugar': ['', Validators.required],
      'actividad': ['', Validators.required]
    })

    this.cursoForm = this._fb.group({
      'institucion': [''],
      'nombre_curso': [''],
      'desde': [''],
      'hasta': ['']
    })

    this.formacionForm = this._fb.group({
      'universidad': [''],
      'grado': [''],
      'fecha_emision': ['']
    })

    this.premioForm = this._fb.group({
      'institucion': [''],
      'distincion': [''],
      'lugar': [''],
      'fecha': ['']
    })

    this.produccionForm = this._fb.group({
      'gestion': [''],
      'fecha': [''],
      'lugar': [''],
      'actividad': [],
      'bien':[]
    })

    this.repForm = this._fb.group({
      'fecha': [''],
      'lugar': [''],
      'actividad': [],
      'recursos': [''],
    })


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
  }


  public saveRes(): void {
    console.log("*----->" + this.masterName);
    this.resumen.id_artista = this.masterName;
    this.formularioService.saveResumen(this.resumen).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status == "Success") {
        alert("Datos Registrados");
        console.log(response.data.id_artista);
        this.resumen = new Resumen();
        this.resumenForm.markAsUntouched();
        this.getRes(response.data.id_artista);
      } else {
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert("ERROR NO SE PUDO GUARDAR LOS DATOS " + err)
      console.log("error", err);
    });
  }

  getRes(id) {
    console.log(id)
    this.formularioService.getResumen(id)
      .subscribe(lista => {
        this.listaResumen = lista
        console.log(this.listaResumen);
      });
  }

  public cancelRes() {
    this.resumen = new Resumen()
  }

  public saveTra(): void {
    console.log("*----->" + this.masterName);
    this.trayectoria.id_artista = this.masterName;
    this.formularioService.saveTrayectoria(this.trayectoria).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status == "Success") {
        alert("Datos Registrados");
        console.log(response.data.id_artista);
        this.trayectoria = new Trayectoria();
        this.trayectoriaForm.markAsUntouched();
        this.getTra(response.data.id_artista);
      } else {
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert("ERROR NO SE PUDO GUARDAR LOS DATOS " + err)
      console.log("error", err);
    });
  }

  getTra(id) {
    console.log(id)
    this.formularioService.getTrayectoria(id)
      .subscribe(lista => {
        this.listaTrayectoria = lista
        console.log(this.listaTrayectoria);
      });
  }

  public cancelTra() {
    this.trayectoria = new Trayectoria()
  }

  public saveCur(): void {
    console.log("*----->" + this.masterName);
    this.curso.id_artista = this.masterName;
    this.formularioService.saveCurso(this.curso).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status == "Success") {
        alert("Datos Registrados");
        console.log(response.data.id_artista);
        this.curso = new Curso();
        this.cursoForm.markAsUntouched();
        this.getCur(response.data.id_artista);
      } else {
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert("ERROR NO SE PUDO GUARDAR LOS DATOS " + err)
      console.log("error", err);
    });
  }

  getCur(id) {
    console.log(id)
    this.formularioService.getCurso(id)
      .subscribe(lista => {
        this.listaCurso = lista
        console.log(this.listaCurso);
      });
  }

  public cancelCur() {
    this.curso = new Curso()
  }



  public saveFor(): void {
    console.log("*----->" + this.masterName);
    this.formacion.id_artista = this.masterName;
    this.formularioService.saveFormacion(this.formacion).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status == "Success") {
        alert("Datos Registrados");
        console.log(response.data.id_artista);
        this.formacion = new Formacion();
        this.formacionForm.markAsUntouched();
        this.getFor(response.data.id_artista);
      } else {
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert("ERROR NO SE PUDO GUARDAR LOS DATOS " + err)
      console.log("error", err);
    });
  }

  getFor(id) {
    console.log(id)
    this.formularioService.getFormacion(id)
      .subscribe(lista => {
        this.listaFormacion = lista
        console.log(this.listaFormacion);
      });
  }

  public cancelFor() {
    this.formacion = new Formacion()
  }


  public savePro(): void {
    console.log("*id----->" + this.masterName);
    this.produccion.id_artista = this.masterName;
    this.formularioService.saveProduccion(this.produccion).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status == "Success") {
        alert("Datos Registrados");
        console.log(response.data.id_artista);
        this.produccion = new Produccion();
        this.produccionForm.markAsUntouched();
        this.getPro(response.data.id_artista);
      } else {
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert("ERROR NO SE PUDO GUARDAR LOS DATOS " + err)
      console.log("error", err);
    });
  }

  getPro(id) {
    console.log(id)
    this.formularioService.getProduccion(id)
      .subscribe(lista => {
        let res: any = lista;
        if(res.length>0){
          this.listaProduccion = lista
          console.log(this.listaProduccion);
        }else{
          this.listaProduccion = [];
        }
        
      });
  }

  public cancelPro() {
    this.produccion = new Produccion()
  }


  public savePre(): void {
    console.log("*----->" + this.masterName);
    this.premio.id_artista = this.masterName;
    this.formularioService.savePremio(this.premio).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status == "Success") {
        alert("Datos Registrados");
        console.log(response.data.id_artista);
        this.premio = new Premios();
        this.premioForm.markAsUntouched();
        this.getPre(response.data.id_artista);
      } else {
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert("ERROR NO SE PUDO GUARDAR LOS DATOS " + err)
      console.log("error", err);
    });
  }

  getPre(id) {
    console.log(id)
    this.formularioService.getPremio(id)
      .subscribe(lista => {
        let res: any = lista
        if (res.length>0){
          this.listaPremio = lista
          console.log(this.listaPremio);
        }else{
          this.listaPremio = [];
        }
      });
  }

  public cancelPre() {
    this.premio = new Premios()
  }

  public saveRep(): void {
    console.log("*----->" + this.masterName);
    this.rep.id_artista = this.masterName;
    this.formularioService.saveRep(this.rep).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status == "Success") {
        alert("Datos Registrados");
        console.log(response.data.id_artista);
        this.rep = new Representacion();
        this.repForm.markAsUntouched();
        this.getRep(response.data.id_artista);
      } else {
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert("ERROR NO SE PUDO GUARDAR LOS DATOS " + err)
      console.log("error", err);
    });
  }

  getRep(id) {
    console.log(id)
    this.formularioService.getRep(id)
      .subscribe(lista => {
        this.listaRepresentacion = lista
        console.log(this.listaRepresentacion);
      });
  }
  public cancelRep() {
    this.rep = new Representacion()
  }
  


}
