import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth/auth.service";

export const CanActivate = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // problem using authService.currentUserSig()?.accessToken as conditional
    // is that token can be expired and you can access routes
    // preview page depends on an onInit API call -> that page will show the fallback code
    // posting links / profile fail with the expired token
    // could inject the jwt-decoder service in this guard and 
    // prevent navigation to all routes with expired token

    if (authService.currentUserSig()?.accessToken) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}