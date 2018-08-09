import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { FormularioService } from '../servicios/formulario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logForm: any;
  usuario: string;
  password: string;
  constructor(private router: Router,
    private _fb: FormBuilder,
    private formularioService: FormularioService,) {
  
  this.logForm = this._fb.group({
    'usuario': ['', Validators.required],
    'password': ['', Validators.required]
  })


     }

  ngOnInit() {
    
  }

  public login() {
    let data = {
      usuario: this.usuario,
      password: this.password
    }
    if (this.validForm()) {
      this.formularioService.loginUsuario(data).subscribe(response => {
        console.log(response)
        if (response.status == "ok"){
          
          console.log(response.data);
          let data = response.data 
          sessionStorage.setItem('token', data.token);
          localStorage.setItem('token', data.token);
          localStorage.setItem('usuario', data.nick_usuario);
          localStorage.setItem('rol', data.id_nivel);
          localStorage.setItem('nombre', data.nombre_usuario);
          localStorage.setItem('apellido', data.apellido_usuario);
          localStorage.setItem('ci', data.ci_usuario);
          let link = ['/home'];
          this.router.navigate(link);
        }else{
          alert(response.msg);
        }
      },(error: any) => {
        alert(error)
      }
      )
    }else{
      alert("Complete los datos")
    }

    

  }

  validForm(): boolean {
    if (this.logForm.valid) {
      return true;
    } else {
      
      return false;
    }

  }

}
