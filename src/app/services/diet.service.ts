import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Diet } from '../models/diet.model';
import { Food } from 'src/app/models/food.model';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private apiUrl = `${environment.apiBaseUrl}/diet`;

  constructor(private http: HttpClient) {}

  matchDiet(food: Food): Observable<Diet> {
    return this.http.post<Diet>(`${this.apiUrl}/getDiet`, food);
  }
}
