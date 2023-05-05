import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, Subject, tap } from 'rxjs';
import { env } from '../../environments/environment'

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  data: {
    email: string
  }
  message: "signup" | 'login' | 'none'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authInfo$: Subject<AuthResponse> = new BehaviorSubject<AuthResponse>({
    data: {email: ''},
    message: 'none'
  })
  public authInfo$ = this._authInfo$.pipe(shareReplay(1))

  constructor( private http:HttpClient) { 
    
  }

  login(credentials: LoginCredentials) {
    return this.http.post(`${env.backurl}login`, credentials)
      .pipe(tap((val) => this._authInfo$.next(val as AuthResponse)))
  }
}
