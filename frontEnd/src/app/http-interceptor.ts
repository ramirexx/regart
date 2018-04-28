import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class HttpLogInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercepted request ... ");

        let localToken = localStorage.getItem('Auth-Token');
        let sessionToken = sessionStorage.getItem('Auth-Token');

        if (localToken != null && sessionToken != null) {
            if (localToken != sessionToken) {
                //window.top.location.href = environment.production;
            } else {
                alert("1")
                const headersConst: any = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Auth-Token': sessionStorage.getItem("Auth-Token")
                });
                console.log(headersConst)
                //request.headers.set('Content-Type', 'application/json');

                // Clone the request to add the new header.
                //const authReq = request.clone({ headers: request.headers.set('Auth-Token', sessionStorage.getItem("Auth-Token"))});
                const authReq = request.clone({ headers: headersConst });

                //console.log("Sending request with new header now ...");
                //send the newly created request
                return next.handle(authReq)
                    .catch((error, caught) => {
                        //console.log('error.status',error.status);
                        
                        if (error.status == 401) {
                            window.top.location.href = environment.urlApi;
                            return Observable.empty();
                        } else {
                            return Observable.throw(error);
                        }
                        //return Observable.throw(error);

                    }) as any;

            }
        } else {
            const newRequest = request.clone({ headers: request.headers });
            return next.handle(newRequest)
                .catch((error, caught) => {
                    //console.log('error.status',error.status);
                    
                    if (error.status == 401) {
                        window.top.location.href = environment.urlApi;
                        return Observable.empty();
                    } else {
                        return Observable.throw(error);
                    }
                    //return Observable.throw(error);

                }) as any;
        }
    }
}