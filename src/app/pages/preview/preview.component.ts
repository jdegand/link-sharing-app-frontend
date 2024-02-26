import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';
import { ApiService } from '../../services/api/api.service';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { UserInfoDto } from '../../interfaces/UserInfoDto';
import { InplaceModule } from 'primeng/inplace';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { TooltipModule } from 'primeng/tooltip';

// This component can have the drop and drag functionality for the links
// Need to have token for api request to get userInfo
// duplicated component into public profile component
// using that component to display the public profile

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink, InplaceModule, ButtonModule, TooltipModule],
  providers: [MessageService],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  apiService = inject(ApiService);
  jwtService = inject(JwtDecoderService);
  messageService = inject(MessageService);
  router = inject(Router);

  userInfo!: UserInfoDto;

  @ViewChild('sharedLink')
  sharedLink!: ElementRef;

  @ViewChild(Tooltip) 
  tooltip!: Tooltip;

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);

      this.apiService.getUser(decodedToken.sub).subscribe({
        next: (response: UserInfoDto) => {
          this.userInfo = response;
        },
        error: (err: unknown) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Profile retrieval failed' });
        },
        complete: () => {
          console.log('done');
        }
      });
    }
  }

  copy() {
    navigator.clipboard.writeText(this.sharedLink.nativeElement.innerText);
    this.tooltip.activate();
  }

}
