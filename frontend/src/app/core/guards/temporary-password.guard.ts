import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TemporaryPasswordGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser && currentUser.isTemporaryPassword) {
      // L'utilisateur a un mot de passe temporaire
      if (state.url !== '/change-password') {
        // Rediriger vers la page de changement de mot de passe sauf si on y est déjà
        this.router.navigate(['/change-password']);
        return false;
      }
    } else {
      // L'utilisateur n'a PAS de mot de passe temporaire
      if (state.url === '/change-password') {
        // Empêcher l'accès à change-password si pas de mot de passe temporaire
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    return true;
  }
}
