import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  createUser(name) {
    const url = URL_API + 'user';
    return this.http.post(url, name);
  }

  getUsers() {
    const url = URL_API + 'user';
    return this.http.get(url);
  }

  updateUser(user) {
    const url = URL_API + 'user';
    return this.http.put(url, user);
  }

  deleteUser(id) {
    const url = URL_API + 'user/' + id;
    return this.http.delete(url);
  }
}
