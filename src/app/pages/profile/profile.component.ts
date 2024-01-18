import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  apiService = inject(ApiService);
  router = inject(Router);

  ngOnInit() {
    this.apiService.getUser()
      .subscribe({
        next: (response) => {
          console.log('profile', response);
          this.authService.currentUserSig.set(response.user);
        },
        error: () => {
          this.authService.currentUserSig.set(null);
        },
      });
  }

  logout() {
    localStorage.clear();
    this.authService.currentUserSig.set(null);
    this.router.navigate(['/home']);
  }

}
