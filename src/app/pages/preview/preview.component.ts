import { Component, OnInit, inject } from '@angular/core';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';
import { ApiService } from '../../services/api/api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserInfoDto } from '../../interfaces/UserInfoDto';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  providers: [MessageService],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  apiService = inject(ApiService);
  jwtService = inject(JwtDecoderService);
  messageService = inject(MessageService);
  router = inject(Router);

  image: any = undefined;

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);

      // could make another api request for username info
      // and add that to the url
      // or change backend response -> need to query user from database -> and add that to the JWT Response
      // adding router to append to the url is a viable approach since the menubar is not really responsive 
      // to changes, as it takes multiple hits to a route for queryParams to be added
      this.router.navigate(['/preview'], { queryParams: { user: decodedToken.sub.split('@')[0] } });

      this.apiService.getUser(decodedToken.sub).subscribe({
        next: (response: UserInfoDto) => {
          console.log('UserInfoDto response', response);
          this.image = `data:${response.profile.fileType};base64,` + response.profile.img;
        },
        error: (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Profile retrieval failed' });
        },
        complete: () => {
          console.log('done');
        }
      });
    }

  }
}
