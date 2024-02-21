import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Link } from '../../interfaces/Link';
import { RegisterDto } from '../../interfaces/RegisterDto';
import { PostProfile } from '../../interfaces/PostProfile';

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

  getUser(email: any) {
    return this.http.get(`http://localhost:8080/users/email/${email}`);
  }

  postLinks(links: Link[]){
    return this.http.post('http://localhost:8080/links', links)
  }

  postProfile(profile: FormData){
    return this.http.post<PostProfile>('http://localhost:8080/profile', profile)
  }

}
