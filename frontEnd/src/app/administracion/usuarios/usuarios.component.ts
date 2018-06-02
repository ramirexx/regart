import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../servicios/formulario.service';
import { Router} from '@angular/router';
import { Usuario } from '../../modelo/usuarios.model';
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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios: Usuario[];
  usuario: Usuario = new Usuario;
  userForm: any;

  panelForm: boolean = false;
  
  niveles=[{id_nivel:1,nivel_desc:'Administrador'},
  {id_nivel:2, nivel_desc:'Supervisor'},
  {id_nivel:3, nivel_desc:'Registrador'},
  {id_nivel:4, nivel_desc:'Publico'}]

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
        'ci_usuarios': [{ value: '' }, Validators.required],
        'nombre_usuario': [{ value: '' }, Validators.required],
        'apellido_usuario': [{ value: '' }, Validators.required],
        'email_usuario': [{ value: '' }, Validators.required],
        'nick_usuario': [{ value: '' }, Validators.required],
        'pass_usuario': [{ value: '' }, Validators.required],
        'id_nivel': [{ value: '' }, Validators.required],
        'id_dpto': [{ value: '' }, Validators.required],
      });
     }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(){
    this.formularioService.getUsuarios()
    .subscribe(lista => {
    this.listaUsuarios = lista
      console.log(this.listaUsuarios);
    });
    
  }

  public save(): void {
    this.formularioService.saveUsuario(this.usuario).subscribe(response => {
      console.log(response);
      //this.artista.numero_registro = 
      if (response.status=="Success"){
        alert("Usuario Registrado");
        this.panelForm = false;
        this.usuario = new Usuario();
        this.getUsuario();

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

  showForm(){
    this.panelForm = true;
  }

  cancel(){
    this.panelForm = false;
  }

}
