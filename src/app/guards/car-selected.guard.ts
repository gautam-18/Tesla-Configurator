import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';

export const carSelectedGuard: CanActivateFn = () => {
  const configuratorService = inject(ConfiguratorService);
  const router = inject(Router);

  if (configuratorService.isCarAndColorSelected()) {
    return true;
  }

  // Redirect to step1 if car and color aren't selected
  alert('Please select a car model and color first');
  router.navigate(['/step1']);
  return false;
};
