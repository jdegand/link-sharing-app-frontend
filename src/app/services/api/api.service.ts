import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../../interfaces/UserInterface';
import { Link } from '../../interfaces/Link';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  register(payload: UserInterface) {
    return this.http.post('https://api.realworld.io/api/users', {
      user: payload,
    })
  }

  login(payload: Partial<UserInterface>) {
    return this.http.post('https://api.realworld.io/api/users/login', {
      user: payload,
    })
  }

  getUser(){
    return this.http.get<{ user: UserInterface }>('https://api.realworld.io/api/user')
  }

  postLinks(links: Link[]){
    return this.http.post('http://localhost:8080/links', links)
  }


}
