import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, delay, filter, map, Observable, of, retry, retryWhen, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  read(): Observable<Donut[]> {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    headers = headers.append('api-token', 'nhjui5467h');
    const options = {
      headers
    };

    return this.http.get<Donut[]>(`/api/donuts`, options).pipe(
      tap((data) => {
        this.donuts = data;
      }),
      retryWhen((errors) => {
        return errors.pipe(
          delay(1000),
          take(3)
        )
      }),
      catchError(this.handleError)
    );
  }

  readById(id: string): Observable<Donut> {
    return this.read().pipe(
      map((donuts) => {
        const donut = donuts.find((donut) => donut.id === id);
        if (donut) {
          return donut;
        }
        return {
          name: '',
          icon: '',
          price: 0,
          description: '',
        };
      })
    );
  }

  create(payload: Donut): Observable<Donut> {
    return this.http.post<Donut>(`/api/donuts`, payload).pipe(
      tap((donut: Donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Donut): Observable<Donut> {
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut: Donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          if (item.id === donut.id) {
            return donut;
          }
          return item;
        });
      }),
      catchError(this.handleError)
    );
  }

  delete(payload: Donut): Observable<Donut> {
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap(() => {
        this.donuts = this.donuts.filter((donut: Donut) => {
          return donut.id !== payload.id;
        });
      }),
      catchError(this.handleError)
    )
  }

  handleError(err: HttpErrorResponse) {
    if(err.error instanceof ErrorEvent) {
      //client-side error
      console.warn("client", err.message);
    } else {
      //server-side error
      console.warn("server", err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
