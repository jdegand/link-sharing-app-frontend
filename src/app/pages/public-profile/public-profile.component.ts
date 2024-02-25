import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { MessageService } from 'primeng/api';
import { UserInfoDto } from '../../interfaces/UserInfoDto';
import { ApiService } from '../../services/api/api.service';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent implements OnInit {
  apiService = inject(ApiService);
  jwtService = inject(JwtDecoderService);
  //messageService = inject(MessageService);
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
          console.log('public response', response);
        },
        error: (err: any) => {
          //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user found' });
          this.loading = false;
          console.log('error', err);
        },
        complete: () => {
          console.log('done');
        }
      });
    }
  }
}