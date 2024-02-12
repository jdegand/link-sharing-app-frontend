import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Link } from '../../interfaces/Link';
import { Profile } from '../../interfaces/Profile';
import { RegisterDto } from '../../interfaces/RegisterDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  register(payload: RegisterDto) {
    return this.http.post('http://localhost:8080/users/new', payload);
  }

  login(payload: any) {
    return this.http.post('http://localhost:8080/auth/authenticate', payload);
  }

  postLinks(links: Link[]){
    return this.http.post('http://localhost:8080/links', links)
  }

  postProfile(profile: Profile){
    return this.http.post('http://localhost:8080/profile', profile)
  }

  /*
  register(payload: any) {
    return this.http.post('https://api.realworld.io/api/users', {
      user: payload,
    })
  }

  login(payload: any) {
    return this.http.post('https://api.realworld.io/api/users/login', {
      user: payload,
    })
  }

  getUser(){
    return this.http.get<any>('https://api.realworld.io/api/user')
  }

  postLinks(links: Link[]){
    return this.http.post('http://localhost:8080/links', links)
  }

  postProfile(profile: Profile){
    return this.http.post('http://localhost:8080/profile', profile)
  }
  */

}
