import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserCreateDTO } from '../models/user-create.dto';
import { Observable } from 'rxjs';
import { UserLoginDTO } from '../models/user-login.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/user/`;

  createUser(user: UserCreateDTO): Observable<UserCreateDTO> {
    return this.http.post<UserCreateDTO>(this.baseUrl, user);
  }

  loginUser(user: UserLoginDTO): Observable<UserLoginDTO> {
    return this.http.post<UserLoginDTO>(this.baseUrl, user);
  }
}
