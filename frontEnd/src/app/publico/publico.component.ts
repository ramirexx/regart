import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../servicios/formulario.service';
import { Router} from '@angular/router';
import { Publico } from '../modelo/usuarios.model';
import {DataTable, MenuItem} from 'primeng/primeng';
import {Column, LazyLoadEvent} from 'primeng/primeng';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit {

  usuario: Publico = new Publico;
  userForm: any;

  tipos=['Nuevo Registro','Renovacion']

  departamentos = [{ codigo: 1, descripcion: 'Chuquisaca' },
  { codigo: 2, descripcion: 'La Paz' },
  { codigo: 3, descripcion: 'Cochabamaba' },
  { codigo: 4, descripcion: 'Oruro' },
  { codigo: 5, descripcion: 'Potosi' },
  { codigo: 6, descripcion: 'Tarija' },
  { codigo: 7, descripcion: 'Santa Cruz' },
  { codigo: 8, descripcion: 'Beni' },
  { codigo: 9, descripcion: 'Pando' }]

  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService,
    private router: Router) {
      this.userForm = this._fb.group({
        'nombres': [{ value: '' }, Validators.required],
        'apellidos': [{ value: '' }, Validators.required],
        'cedula': [{ value: '' }, Validators.required],
        'email': [{ value: '' }, [Validators.required, Validators.email]],
        'tipo': [{ value: '' }, Validators.required],
        'dpto': [{ value: '' }, Validators.required],
      });
     }

  ngOnInit() {
  }

  public save(): void {
    this.formularioService.saveUsuarioPublico(this.usuario).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status=="Success"){
        alert("Usuario Registrado");
        this.usuario = new Publico();

      }else{
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert(err)
      console.log("error", err);
      //let link = ['home/listado-artistas/'];
      //this.router.navigate(link);
    });
  }

}
