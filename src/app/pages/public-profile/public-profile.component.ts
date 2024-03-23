import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Preview } from '../../interfaces/Preview';
import { take } from 'rxjs';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [RouterLink, ProgressSpinnerModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent implements OnInit {
  apiService = inject(ApiService);
  jwtService = inject(JwtDecoderService);
  private activatedRoute = inject(ActivatedRoute);

  userInfo!: Preview;
  loading = true;

  ngOnInit() {

    const userId = this.activatedRoute.snapshot.params['userId'];
    const username = this.activatedRoute.snapshot.params['username'];

    if (userId && username) {

      this.apiService.getUserByUsernameAndId(username, Number(userId)).pipe(take(1)).subscribe({
        next: (response: Preview) => {
          this.loading = false;
          this.userInfo = response;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}