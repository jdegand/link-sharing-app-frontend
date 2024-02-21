import { Component, OnInit, inject } from '@angular/core';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';
import { ApiService } from '../../services/api/api.service';
import { MessageService } from 'primeng/api';

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

  image: any = undefined;

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);

      this.apiService.getUser(decodedToken.sub).subscribe({
        next: (response: any) => {
          console.log('response', response);

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
