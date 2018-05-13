import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../servicios/formulario.service';
import { Router} from '@angular/router';
import { Categoria, SubCategoria, Actividad, Especialidad } from '../../modelo/categoria.model';
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
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  categoriaForm: any;
  categoria: Categoria = new Categoria();
  subCategoria: SubCategoria = new SubCategoria();
  actividad: Actividad = new Actividad();
  especialidad: Especialidad = new Especialidad();
  listaCategorias: Categoria[];
  listaSubCategorias: any[];
  listaActividad: any[];
  listaEspecialidad: any[];
  

  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService,
    private router: Router) {

      this.categoriaForm = this._fb.group({
        'descripcion':[{ value: '' }, Validators.required]
      })
     }

  ngOnInit() {
  
    this.getCategorias();
    this.getSubCategorias();
    this.getActividades();
    this.getEspecialidades();
  }

  getCategorias(){
    this.formularioService.getCategorias()
    .subscribe(lista => {
    this.listaCategorias = lista
      console.log(this.listaCategorias);
    });
    
  }

  ediCat(){
    alert("En desarrollo...")
  }



  getSubCategorias(){
    this.formularioService.getSubCategorias()
    .subscribe(lista => {
    this.listaSubCategorias = lista
      console.log(this.listaSubCategorias);
    },err =>{
      console.log(err)
    });
    
  }
  saveCat(): void {
    this.formularioService.saveCategoria(this.categoria).subscribe(response => {
      console.log(response);
      if (response.status=="Success"){
        alert("Sector Registrada");
        this.categoria = new Categoria();
        this.getCategorias();
      }else{
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert(err)
      console.log("error", err);
    });
  }

  editSub(){
    alert("En desarrollo...")
  }

  saveSubCat(): void {
    this.formularioService.saveSubCategoria(this.subCategoria).subscribe(response => {
      console.log(response);
      if (response.status=="Success"){
        alert("Sub Sector Registrado");
        this.subCategoria = new SubCategoria();
        this.getSubCategorias();
      }else{
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert(err)
      console.log("error", err);
    });
  }

  getActividades(){
    this.formularioService.getActividades()
    .subscribe(lista => {
    this.listaActividad = lista
      console.log(this.listaActividad);
    });
  }

  saveActividad(): void {
    this.formularioService.saveActividad(this.actividad).subscribe(response => {
      console.log(response);
      if (response.status=="Success"){
        alert("Actividad Registrado");
        this.actividad = new Actividad();
        this.getActividades();
      }else{
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert(err)
      console.log("error", err);
    });
  }

  getEspecialidades(){
    this.formularioService.getEspecialidades()
    .subscribe(lista => {
    this.listaEspecialidad = lista
      console.log(this.listaEspecialidad);
    });
  }

  saveEspecialidad(): void {
    this.formularioService.saveEspecialidad(this.especialidad).subscribe(response => {
      console.log(response);
      if (response.status=="Success"){
        alert("Actividad Especialidad");
        this.especialidad = new Especialidad();
        this.getEspecialidades();
      }else{
        alert("No se pudo realizar el registro!")
      }
    }, err => {
      alert(err)
      console.log("error", err);
    });
  }


    
  



}
