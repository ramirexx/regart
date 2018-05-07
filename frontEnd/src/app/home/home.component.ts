import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: string;
  token: string;
  rol:string;
  nombre:string

  constructor(public router: Router) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.token = localStorage.getItem('token');
    this.rol = localStorage.getItem('rol');
    this.nombre = localStorage.getItem('nombre');

  }

}
