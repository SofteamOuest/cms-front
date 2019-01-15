import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageService} from './message.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Training} from '../bean/training'

@Injectable({
  providedIn: 'root'
})
export class TrainingsService extends AbstractService {

  private urlTrainings ="http://localhost:8090/trainings/list/";
  private urlTraining ="http://localhost:8090/trainings";

  constructor(private http: HttpClient,protected messageService: MessageService) {
    super(messageService);
   }

  public getTrainings(): Observable<Training[]>{
    return this.http.get<Training[]>(this.urlTrainings)
      .pipe(
        tap(_ => this.log('fetched trainings')),
        catchError(this.handleError('getTrainings', []))
      );
  } 

  public getTraining(id:Number): Observable<Blob>{
    const url = `${this.urlTraining}/${id}`;
    return this.http.get(url,{responseType:"blob"})
      .pipe(
        tap(_ => this.log('fetched training id=${id}')),
        catchError(this.handleError<Blob>('getTraining id=${id}'))
      );
  }


}
