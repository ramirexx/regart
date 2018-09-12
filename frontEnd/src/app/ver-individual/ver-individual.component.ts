import { Component, OnInit } from '@angular/core';
import { Individual } from '../modelo/individual.model';
import { FormularioService } from '../servicios/formulario.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ver-individual',
  templateUrl: './ver-individual.component.html',
  styleUrls: ['./ver-individual.component.css']
})
export class VerIndividualComponent implements OnInit {

  artista: Individual = new Individual();
  private base64Foto:String="";
  imagePath:string;
  qr: string = "";
  depto: string;
  listaTrayectoria: any[];
  listaCurso: any[];
  listaFormacion: any[];
  listaPremio: any[];
  listaProduccion: any[];
  exp:string;
  
  constructor(private formularioService: FormularioService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }

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
            this.qr = this.artista.d_nombres + this.artista.d_apellidos 
            this.exp = this.getExp(this.artista.d_exp);
            this.getTra(id);
            this.getCur(id);
            this.getFor(id);
            this.getPro(id);
            this.getPre(id);
            

            //this.qr = this.artista.numero_registro + this.artista.d_nombres + this.artista.d_apellidos 
            /*switch (this.artista.id_dpto) {
              case 1:
                this.depto = "Chuquisaca"
                break;
              case 2:
                this.depto = "La Paz"
                break;
              case 3:
                this.depto = "Cochabamaba"
                break;
              case 4:
                this.depto = "Oruro"
                break;
              case 5:
                this.depto = "Potosi"
                break;
              case 6:
                this.depto = "Tarija"
                break;
              case 7:
                this.depto = "Santa Cruz"
                break;
              case 8:
                this.depto = "Beni"
                break;
              case 9:
                this.depto = "Pando"
                break;
            }*/
          })
      }
    })
  }


  getExp(x){
    switch (x) {
      case "1":
        this.depto = "CH"
        break;
      case "2":
        this.depto = "LP"
        break;
      case "3":
        this.depto = "CBBA"
        break;
      case "4":
        this.depto = "OR"
        break;
      case "5":
        this.depto = "PT"
        break;
      case "6":
        this.depto = "TJA"
        break;
      case "7":
        this.depto = "SCZ"
        break;
      case "8":
        this.depto = "BN"
        break;
      case "9":
        this.depto = "PD"
        break;
        
    }
    console.log(this.depto)
    return this.depto;
  }

  getTra(id) {
    console.log(id)
    this.formularioService.getTrayectoria(id)
      .subscribe(lista => {
        this.listaTrayectoria = lista
        console.log(this.listaTrayectoria);
      });
  }

  getCur(id) {
    console.log(id)
    this.formularioService.getCurso(id)
      .subscribe(lista => {
        this.listaCurso = lista
        console.log(this.listaCurso);
      });
  }

  getFor(id) {
    console.log(id)
    this.formularioService.getFormacion(id)
      .subscribe(lista => {
        this.listaFormacion = lista
        console.log(this.listaFormacion);
      });
  }

  getPro(id) {
    console.log(id)
    this.formularioService.getProduccion(id)
      .subscribe(lista => {
        this.listaProduccion = lista
        console.log(this.listaProduccion);
      });
  }

  getPre(id) {
    console.log(id)
    this.formularioService.getPremio(id)
      .subscribe(lista => {
        this.listaPremio = lista
        console.log(this.listaPremio);
      });
  }

  volver(){
    let link = ['home/listado-artistas/'];
    this.router.navigate(link);
  }
}
