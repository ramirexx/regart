import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { Artista } from '../modelo/artista.model';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  

  private items: MenuItem[];


  artForm: any;
  artista: Artista= new Artista();

  //calendrio;
  es: any;

  constructor(private router: Router) {
}

  ngOnInit() {

    this.items = [{
      label: 'Ministerio de Culturas y Turismo',
      items: [
          {label: 'Registro Individual', icon: 'fa-user', routerLink: ['/registro-individual']},
          {label: 'Registro  Colectivo', icon: 'fa-group', routerLink: ['/registro-colectivo']}
      ]
  },
  /*{
      label: 'Edit',
      items: [
          {label: 'Undo', icon: 'fa-refresh'},
          {label: 'Redo', icon: 'fa-repeat'}
      ]
  }*/
];

  }

}
