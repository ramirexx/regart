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
import { Publico} from '../modelo/usuarios.model';





@Injectable()
export class FormularioService {

  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'departamentos').map(this.extractData)
      .catch(this.handleError);
  }

  getProvincias(cod:any): Observable<any[]> {
    return this.http.get(environment.urlApi + 'provincias?dep='+cod).map(this.extractData)
      .catch(this.handleError);
  }

  getMunicipios(cod:any, dep:any): Observable<any[]> {
    return this.http.get(environment.urlApi + 'localidades?pro='+cod+'&dep='+dep).map(this.extractData)
      .catch(this.handleError);
  }
  

  getCategorias(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaCategorias').map(this.extractData)
      .catch(this.handleError);
  }
  //http://localhost/api/regart/subCategorias?cat=1
  getSubSector(cod:any): Observable<any[]> {
    return this.http.get(environment.urlApi + 'subCategorias?sec='+cod).map(this.extractData)
      .catch(this.handleError);
  }

  //http://localhost/api/regart/actividades?id=1
  getActividad(cod:any): Observable<any[]> {
    return this.http.get(environment.urlApi + 'actividades?sub='+cod).map(this.extractData)
      .catch(this.handleError);
  }

  //http://localhost/api/regart/especialidad?act=1
  getEspecialidad(cod:any): Observable<any[]> {
    return this.http.get(environment.urlApi + 'especialidad?act='+cod).map(this.extractData)
      .catch(this.handleError);
  }

  saveCategoria (data:any): Observable<any> {
    return this.http.post(environment.urlApi + 'insertCategorias', data).map(this.extractData) 
      .catch(this.handleError);
  }

  getSubCategorias(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaSubCategorias').map(this.extractData)
      .catch(this.handleError);
  }
  
  saveSubCategoria (data:any): Observable<any> {
    return this.http.post(environment.urlApi + 'insertSubCategorias', data).map(this.extractData) 
      .catch(this.handleError);
  }

  getActividades(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaActividades').map(this.extractData)
      .catch(this.handleError);
  }

  saveActividad (data:any): Observable<any> {
    return this.http.post(environment.urlApi + 'insertActividad', data).map(this.extractData) 
      .catch(this.handleError);
  }

  getEspecialidades(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaEspecialidades').map(this.extractData)
      .catch(this.handleError);
  }

  saveEspecialidad (data:any): Observable<any> {
    return this.http.post(environment.urlApi + 'insertEspecialidad', data).map(this.extractData) 
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

//  obj.updateAlumno = function (id,alumno) {
  //  return $http.post(serviceBase + 'updateAlumno', {id:id, alumno:alumno})
  updateIndividual (id: number, data:Individual): Observable<any> {
    return this.http.post(environment.urlApi + 'updateIndividual', {id,data}).map(this.extractData) 
      .catch(this.handleError);
  }


  updateEstadoIndividual (obj: any): Observable<any> {
    return this.http.post(environment.urlApi + 'updateEstado', obj).map(this.extractData) 
      .catch(this.handleError);
  }

  getArtistasIndividual(): Observable<any[]> {
    return this.http.get(environment.urlApi + 'listaIndividual').map(this.extractData)
      .catch(this.handleError);
  }

  getIndividual(id: any): Observable<Individual> {
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

  saveUsuarioPublico (data:Publico): Observable<any> {
    return this.http.post(environment.urlApi + 'insertUsuarioPublico', data).map(this.extractData) 
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