import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { JwtDecoderService } from "../../services/jwt/jwt-decoder.service";
import { ApiService } from "../../services/api/api.service";
import { MessageService } from "primeng/api";
import { Router, RouterLink } from "@angular/router";
import { InplaceModule } from "primeng/inplace";
import { ButtonModule } from "primeng/button";
import { Tooltip } from "primeng/tooltip";
import { TooltipModule } from "primeng/tooltip";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { Preview } from "../../interfaces/Preview";
import { take } from "rxjs";
import { TitleCasePipe } from "@angular/common";

// This component can have the drop and drag functionality for the links

@Component({
  selector: "app-preview",
  standalone: true,
  imports: [
    RouterLink,
    InplaceModule,
    ButtonModule,
    TooltipModule,
    ProgressSpinnerModule,
    TitleCasePipe,
  ],
  providers: [MessageService],
  templateUrl: "./preview.component.html",
  styleUrl: "./preview.component.css",
})
export class PreviewComponent implements OnInit {
  apiService = inject(ApiService);
  jwtService = inject(JwtDecoderService);
  messageService = inject(MessageService);
  router = inject(Router);

  userInfo!: Preview;
  loading = true;

  @ViewChild("sharedLink")
  sharedLink!: ElementRef;

  @ViewChild(Tooltip)
  tooltip!: Tooltip;

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);

      this.apiService
        .getUser(decodedToken.sub)
        .pipe(take(1))
        .subscribe({
          next: (response: Preview) => {
            this.loading = false;
            this.userInfo = response;
          },
          error: () => {
            this.loading = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Profile retrieval failed",
            });
          },
        });
    }
  }

  copy() {
    navigator.clipboard.writeText(this.sharedLink.nativeElement.innerText);
    this.tooltip.activate();
  }

  delete(linkId: number | undefined) {
    this.apiService
      .deleteLinkById(linkId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          location.reload();
        },
        error: () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Deletion failed",
          });
        },
      });
  }
}
