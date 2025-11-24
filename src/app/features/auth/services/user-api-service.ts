import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserCreateDTO } from '../models/user-create.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private baseUrl = 'https://panamapi-abgpgphwafbvezdj.canadacentral-01.azurewebsites.net/api/user';

  http = inject(HttpClient);

  createUser(user: UserCreateDTO): Observable<UserCreateDTO> {
    return this.http.post<UserCreateDTO>(this.baseUrl, user);
  }
}
