import { Component, effect, inject } from "@angular/core";
import { MenuItem } from "primeng/api";
import { MenubarModule } from "primeng/menubar";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { DropdownModule } from "primeng/dropdown";
import { ThemeService } from "../../services/theme/theme.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MenubarModule, DropdownModule, FormsModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  themeService = inject(ThemeService);

  items: MenuItem[] = [];

  themes = [
    {
      id: "lara-light-blue",
      label: "Lara Light Blue",
    },
    {
      id: "rhea",
      label: "Rhea",
    },
    {
      id: "mdc-dark-indigo",
      label: "MDC Dark Indigo",
    },
  ];

  localStorageTheme = localStorage.getItem("theme");

  selectedTheme: { id: string; label: string } =
    this.themes.find((theme) => theme.id === this.localStorageTheme) ??
    this.themes[0];

  changeTheme(themeId: string) {
    this.themeService.switchTheme(themeId);
  }

  constructor() {
    this.changeTheme(this.selectedTheme.id);

    effect(() => {
      if (this.authService.currentUserSig()) {
        this.items = [
          {
            label: "Profile Details",
            icon: "pi pi-user-edit",
            routerLink: "/profile",
          },
          {
            label: "Links",
            icon: "pi pi-link",
            routerLink: "/links",
          },
          {
            label: "Preview",
            icon: "pi pi-eye",
            routerLink: "/preview",
          },
          {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => this.logout(),
          },
        ];
      } else {
        this.items = [
          {
            label: "Sign-in",
            icon: "pi pi-sign-in",
            routerLink: "/login",
            items: [
              {
                label: "Register",
                routerLink: "/register",
              },
            ],
          },
        ];
      }
    });
  }

  logout() {
    // refactored a few times
    // had a logout method in the authService
    // not really necessary there -> I am not invoking logout method anywhere else in the app

    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    this.authService.currentUserSig.set(undefined); // undefined vs null
    this.router.navigate(["/login"]);
  }
}
