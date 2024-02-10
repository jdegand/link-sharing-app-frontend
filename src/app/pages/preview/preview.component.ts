import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  apiService = inject(ApiService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.apiService.getUser()
    .subscribe({
      next: (response) => {
        // probably don't want to mess with the signal here for either response
        // you already logged in to get here 
        // best to just show error and do api request retry
        this.authService.currentUserSig.set(response.user);
      },
      error: () => {
        this.authService.currentUserSig.set(undefined);
        // toast here for error
      },
    });
  }
}
