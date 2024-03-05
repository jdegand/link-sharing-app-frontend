import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Link } from '../../interfaces/Link';
import { RegisterDto } from '../../interfaces/RegisterDto';
import { PostProfile } from '../../interfaces/PostProfile';
import { UserInfoDto } from '../../interfaces/UserInfoDto';
import { AuthRequest } from '../../interfaces/AuthRequest';
import { AuthResponse } from '../../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  register(payload: RegisterDto) {
    return this.http.post<Partial<UserInfoDto>>('http://localhost:8080/users/new', payload);
  }

  login(payload: AuthRequest) {
    return this.http.post<AuthResponse>('http://localhost:8080/auth/authenticate', payload);
  }

  getUser(email: string) {
    return this.http.get<UserInfoDto>(`http://localhost:8080/users/email/${email}`);
  }

  postLinks(links: Link[]) {
    return this.http.post<Link[]>('http://localhost:8080/links', links)
  }

  postProfile(profile: FormData) {
    return this.http.post<PostProfile>('http://localhost:8080/profile', profile)
  }

  getUserByUsernameAndId(username: string, id: number) {
    return this.http.get<UserInfoDto>(`http://localhost:8080/users/username/${username}/id/${id}`);
  }

  deleteLinkById(linkId: number | undefined) {
    return this.http.delete<String>(`http://localhost:8080/links/${linkId}`);
  }

  getNewToken(refreshToken: string){
    return this.http.post<AuthResponse>('http://localhost:8080/auth/refresh', refreshToken);
  }

}
