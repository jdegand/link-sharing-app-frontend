import { DOCUMENT } from "@angular/common";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  document = inject(DOCUMENT);

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      "app-theme",
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + ".css"; // bundle name
      localStorage.setItem("theme", theme);
    }
  }
}
