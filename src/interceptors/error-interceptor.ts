import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
        
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log("Passou no interceptor");
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if(errorObj.erro){
                errorObj = errorObj.erro; 
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor: ");
            console.log(errorObj);


            return Observable.throw(errorObj);
        }) as any;

    }

    }

    export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
    };