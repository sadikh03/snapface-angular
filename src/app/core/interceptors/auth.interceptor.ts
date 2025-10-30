import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // creation d'un headers  utilisables par Angular avec  new HttpHeaders()
        const headers = new HttpHeaders()
        // append()  pour y ajouter un header  Authorization  qui contient  Bearer TOKEN 
        //   – c'est souvent la forme requise pour ce type de header ;
        .append('Authorization', `Bearer ${this.authService.getToken()}`);
        // nouvelle requête en clonant la précédente et en y ajoutant les  headers
        const modifiedReq = req.clone({ headers });
        // on return  next.handle()  en y passant la nouvelle requête – 
        // c'est ce qui permet à la requête de continuer son chemin.
        return next.handle(modifiedReq);
    }
}