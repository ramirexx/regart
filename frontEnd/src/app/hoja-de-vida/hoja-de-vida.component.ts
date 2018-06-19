import { Component, OnInit } from '@angular/core';
import { Trayectoria } from '../modelo/individual.model';
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

  listaTrayectoria: any[];
  trayectoria: Trayectoria = new Trayectoria();
  trayectoriaForm: any;
  es: any;


  constructor(private _fb: FormBuilder,
    private formularioService: FormularioService) {

      this.trayectoriaForm = this._fb.group({
        'gestion': ['', Validators.required],
        'fecha': ['', Validators.required],
        'lugar': ['', Validators.required],
        'actividad': ['', Validators.required]
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

}
