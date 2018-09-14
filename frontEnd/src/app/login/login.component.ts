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
  resetForm: any;
  usuario: string;
  password: string;
  email: string;

  recovery: boolean = false;
  constructor(private router: Router,
    private _fb: FormBuilder,
    private formularioService: FormularioService,) {
  
  this.logForm = this._fb.group({
    'usuario': ['', Validators.required],
    'password': ['', Validators.required]
  })

  this.resetForm = this._fb.group({
    'email': ['', Validators.required],
  })


     }

  ngOnInit() {
    
  }

  onNavigate(){
    //window.open("http://localhost/runa_publicar1/para_correo/publico.component", "_blank");
   // window.open("http://192.168.113.161/para_correo/publico.component", "_blank");
   window.open("http://186.121.206.75/para_correo/publico.component.php");
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
          localStorage.setItem('dpto', data.id_dpto);
          
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

  passRecovery(){
    console.log("Recupera contraseña");
    this.recovery = true;
  }

  sendEmail(){
    let data = {
      email: this.email,
    }
    console.log(this.resetForm)
    if (this.resetForm.valid) {
      this.formularioService.resetPassword(data).subscribe(response => {
        console.log(response)
        if (response.status == "ok"){
          
          console.log(response.data);
          let data = response.data 
          alert("Por favor revise su correo electrónico")     
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

  cancel(){
    this.recovery = false;
  }

  validForm(): boolean {
    if (this.logForm.valid) {
      return true;
    } else {
      
      return false;
    }

  }

}
