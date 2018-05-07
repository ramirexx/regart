import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment }     from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HttpClient,HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Artista} from '../modelo';
import { Individual } from '../modelo/individual.model';
import { Usuario} from '../modelo/usuarios.model';





@Injectable()
export class FormularioService {

  constructor(private http: HttpClient) { }
  

  getCategorias(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaCategorias').map(this.extractData)
      .catch(this.handleError);
  }

  saveColectivo (data:Artista): Observable<any> {
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    //let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    return this.http.post(environment.urlApi + 'insertColectivo', data).map(this.extractData) 
      .catch(this.handleError);
      
  }
  
  saveIndividual (data:Individual): Observable<any> {
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    //let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    return this.http.post(environment.urlApi + 'insertIndividual', data).map(this.extractData) 
      .catch(this.handleError);
      
  }

  getArtistasIndividual(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaIndividual').map(this.extractData)
      .catch(this.handleError);
  }

  getIndividual(id: string): Observable<Individual> {
    return this.http.get(environment.urlApi + 'individual?id='+id).map(this.extractData)
      .catch(this.handleError);
  }


  getUsuarios(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaUsuarios').map(this.extractData)
      .catch(this.handleError);
  }

  saveUsuario (data:Usuario): Observable<any> {
    return this.http.post(environment.urlApi + 'insertUsusario', data).map(this.extractData) 
      .catch(this.handleError);
  }

  loginUsuario (data:any): Observable<any> {
    return this.http.post(environment.urlApi + 'accesAuth', data).map(this.extractData) 
      .catch(this.handleError);
  }




  private extractData(res: Response) {
    let body = res;
    return body || {};
    //console.log(body)
  }

  /*private extractDataHttpResponse(res: HttpResponse<Object>) {
    return res;
  }*/

  private handleError(error: any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  

}