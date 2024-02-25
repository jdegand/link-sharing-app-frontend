import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserInfoDto } from '../../interfaces/UserInfoDto';
import { ApiService } from '../../services/api/api.service';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent implements OnInit {
  apiService = inject(ApiService);
  jwtService = inject(JwtDecoderService);
  private activatedRoute = inject(ActivatedRoute);

  userInfo!: UserInfoDto;
  loading = true;

  ngOnInit() {

    const userId = this.activatedRoute.snapshot.params['userId'];
    const username = this.activatedRoute.snapshot.params['username'];

    if (userId && username) {

      this.apiService.getUserByUsernameAndId(username, Number(userId)).subscribe({
        next: (response: UserInfoDto) => {
          this.loading = false;
          this.userInfo = response;
        },
        error: (err: unknown) => {
          this.loading = false;
        },
        complete: () => {
          console.log('done');
        }
      });
    }
  }
}