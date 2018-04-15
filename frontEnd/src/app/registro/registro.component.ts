import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { Artista } from '../modelo/artista.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  artForm: any;
  artista: Artista= new Artista();

  //calendrio;
  es: any;


  //listas
  departamentos = [{ codigo: 1, descripcion: 'LA PAZ' }, { codigo: 2, descripcion: 'ORURO' }];

  constructor(private _fb: FormBuilder) {
    
    this.artForm = this._fb.group({
      'seltipoOperacion': [{ value: '' }, Validators.required],
      'ci_usuarios': [{ value: ''}, Validators.required],
      'd_modificador': [{ value: '', }, Validators.required],
      'gestion': [{ value: '' }, Validators.required],
      'd_fecha': [{ value: '' }, Validators.required],
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
      'd_antecedentes_grupo': [{value: ''}, Validators.required],
      'id_cat': [{value: ''}, Validators.required],
      'id_sub_cat': [{value: ''}, Validators.required],
      'd_especialidad_grupo': [{value: ''}, Validators.required],
      'd_biografia_grupo': [{value: ''}, Validators.required],
      'id_doc_resp': [{value: ''}, Validators.required],
      'd_doc_respaldo': [{value: ''}, Validators.required],
      'd_logo_grupo': [{value: ''}, Validators.required],
      'id_estado': [{value: ''}, Validators.required],

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
  }

}
