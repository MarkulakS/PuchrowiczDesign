import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpreq: HttpClient) { }

  sendMessage(body: Object) {
    let headers = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.httpreq.post("http://localhost:3000/email", body, headers).pipe(
      catchError(error => {
        console.log(error);
        return throwError('Something went wrong!');
      })
    );
  }
}
