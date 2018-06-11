import { Component, OnInit } from '@angular/core';
import { FormIndividual } from '../modelo/individual.model';
import { FormularioService } from '../servicios/formulario.service';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  artista: FormIndividual = new FormIndividual();
  private base64Foto:String="";
  imagePath:string;
  depto: string;
  pro: string;
  mun: string;


  constructor(private formularioService: FormularioService,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      console.log("REVISION :", params);
      let id = params['id'];
      if (id != undefined) {
        console.log(id);
        this.formularioService.getFormIndividual(id)
          .subscribe(artista => {
            this.artista = artista;
            console.log(this.artista)
            this.imagePath = this.artista.d_foto;
            this.base64Foto = this.artista.d_foto;
            //this.depto = this.getDepto(this.artista.id_dpto);
            console.log(this.artista.id_dpto)
            console.log(this.depto)
          })
      }
    })
  }


  getDepto(x){
    switch (x) {
      case "1":
        this.depto = "Chuquisaca"
        break;
      case "2":
        this.depto = "La Paz"
        break;
      case "3":
        this.depto = "Cochabamaba"
        break;
      case "4":
        this.depto = "Oruro"
        break;
      case "5":
        this.depto = "Potosi"
        break;
      case "6":
        this.depto = "Tarija"
        break;
      case "7":
        this.depto = "Santa Cruz"
        break;
      case "8":
        this.depto = "Beni"
        break;
      case "9":
        this.depto = "Pando"
        break;
        
    }
    console.log(this.depto)
    return this.depto;
  }
 

_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64Foto= btoa(binaryString);
         
         this.artista.d_foto = this.base64Foto
         console.log(btoa(binaryString));
 }

}
