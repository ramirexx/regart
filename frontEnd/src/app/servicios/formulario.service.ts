import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class FormularioService {

  constructor(public http: HttpClient) {
  }


  getCategorias(): Observable<any> {
    return this.http.get(environment.urlApi + 'listaCategorias').map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data = res;
    console.log(data)
    return data;
  }

  private handleError(error: any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}