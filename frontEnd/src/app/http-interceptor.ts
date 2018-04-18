import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
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

        
        //if (localToken != null && sessionToken != null) {
            //if (localToken != sessionToken) {
                //window.top.location.href = environment.;
                //alert("no autentificado")
            //} else {
                //request.headers.set('Content-Type', 'application/json');
                
                // Clone the request to add the new header.
                const authReq = request.clone({ headers: request.headers.set('Content-Type', 'application/json')});
                //const authReq = request.clone({ headers: request.headers.set('Content-Type', 'application/json;charset=UTF-8')});
                console.log("Sending request with new header now ...",authReq);
                //send the newly created request
                return next.handle(authReq)
                    .catch((error, caught) => {
                        //intercept the respons error and displace it to the console
                        console.log("Error Occurred");
                        console.log(error);
                        //return the error to the method that called it
                        return Observable.throw(error);
                    }) as any;

        //    }
        /*}else{
            alert("!")
            request.headers.set('Content-Type', 'application/json');
            const newRequest = request.clone({ headers: request.headers });
            console.log(newRequest)
            return next.handle(newRequest);
            

        }*/
    }
}