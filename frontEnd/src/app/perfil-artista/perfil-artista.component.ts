import { Component, OnInit } from '@angular/core';
import { Individual } from '../modelo/individual.model';
import { FormularioService } from '../servicios/formulario.service';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-perfil-artista',
  templateUrl: './perfil-artista.component.html',
  styleUrls: ['./perfil-artista.component.css']
})
export class PerfilArtistaComponent implements OnInit {

  artista: Individual = new Individual();
  private base64FotoPerfil:String="";
  imagePath:string;
  qr: string = "";
  depto: string;
  listaTrayectoria: any[];
  listaCurso: any[];
  listaFormacion: any[];
  listaPremio: any[];
  listaProduccion: any[];

  constructor(private formularioService: FormularioService,
    private route: ActivatedRoute,
    private router: Router) { }

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
            this.base64FotoPerfil = this.artista.d_foto_artista;
            this.qr = this.artista.d_nombres + this.artista.d_apellidos 
            this.getTra(id);
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

  getTra(id) {
    console.log(id)
    this.formularioService.getTrayectoria(id)
      .subscribe(lista => {
        this.listaTrayectoria = lista
        console.log(this.listaTrayectoria);
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


}
