import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../models/user.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.freeprojectapi.com/api/UserApp';

  constructor(private http: HttpClient) {}

  registerUser(user: UserRegister) : Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.apiUrl}/CreateNewUser`, user);
  }

  loginUser(user: UserLogin) : Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user)
  }
}
