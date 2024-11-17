import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = !!sessionStorage.getItem('token');
  const requiredRole = route.data['role'];
  const userRole = sessionStorage.getItem('role')
  if (isAuthenticated && userRole==requiredRole) {
    return true; 
  }
  return false  
};
