import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Link } from '../../interfaces/Link';
import { RegisterDto } from '../../interfaces/RegisterDto';
import { PostProfile } from '../../interfaces/PostProfile';
import { UserInfoDto } from '../../interfaces/UserInfoDto';
import { AuthRequest } from '../../interfaces/AuthRequest';
import { AuthResponse } from '../../interfaces/AuthResponse';
import { Preview } from '../../interfaces/Preview';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);
  authService = inject(AuthService);

  #apiUrl = environment.apiUrl;

  register(payload: RegisterDto) {
    return this.http.post<Partial<UserInfoDto>>(`${this.#apiUrl}/users/new`, payload);
  }

  login(payload: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.#apiUrl}/auth/authenticate`, payload);
  }

  getUser(email: string) {
    return this.http.get<Preview>(`${this.#apiUrl}/users/email/${email}`);
  }

  postLinks(links: Link[]) {
    return this.http.post<Link[]>(`${this.#apiUrl}/links`, links)
  }

  postProfile(profile: FormData) {
    return this.http.post<PostProfile>(`${this.#apiUrl}/profile`, profile)
  }

  getUserByUsernameAndId(username: string, id: number) {
    return this.http.get<Preview>(`${this.#apiUrl}/users/username/${username}/id/${id}`);
  }

  deleteLinkById(linkId: number | undefined) {
    return this.http.delete<String>(`${this.#apiUrl}/links/${linkId}`);
  }

  getNewToken(refreshToken: string) {
    const payload = JSON.stringify({ token: refreshToken });
    return this.http.post<AuthResponse>(`${this.#apiUrl}/auth/refresh`, payload);
  }

  getNewToken2() {
    return this.http.get<AuthResponse>(`${this.#apiUrl}/auth/refresh2?token=${this.authService.getRefreshTokenFromLocalStorage()}`);
  }

}
