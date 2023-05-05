import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, Subject, tap } from 'rxjs';
import { env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {

  }
  getCards(page: number = 1, pageSize: number = 10) {
    return this.http.get(`${env.backurl}pokemon/`, { params: { page, pageSize, } })
  }
  getCardsOne(q: any) {
    const query = `q=name:${q}`
    return this.http.get(`${env.backurl}pokemon/one/?${query}`)

  }
}
