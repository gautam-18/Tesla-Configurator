import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from '../configurator.service';
import { Config, CarOptions } from '../models.type';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit {
  carOptions: CarOptions | null = null;

  public carServices = inject(ConfiguratorService);
  private router = inject(Router);

  get modelCode(): string {
    return this.carServices.currentCar()?.code || '';
  }

  get modelDescription(): string {
    return this.carServices.currentCar()?.description || '';
  }

  get colorDescription(): string {
    return this.carServices.currentColor()?.description || '';
  }

  get carImageUrl(): string {
    const modelCode = this.carServices.currentCar()?.code || '';
    const colorCode = this.carServices.currentColor()?.code || '';

    return modelCode && colorCode
      ? `https://interstate21.com/tesla-app/images/${modelCode}/${colorCode}.jpg`
      : '';
  }

  ngOnInit(): void {
    this.loadCarOptions();
  }

  loadCarOptions(): void {
    const modelCode = this.carServices.currentCar()?.code;

    if (modelCode) {
      this.carServices.getCarOptions(modelCode).subscribe({
        next: (options) => {
          this.carOptions = options;

          this.carServices.yokeSelected.set(false);
          this.carServices.towHitchSelected.set(false);
        },
        error: (err) => {
          console.error('Error loading car options:', err);
        },
      });
    }
  }
  onConfigSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const configId = Number(selectElement.value);
    const selected = this.carOptions?.configs.find((c) => c.id === configId);

    if (selected) {
      this.carServices.currentConfig.set(selected);
    }
  }
  get range(): number {
    return this.carServices.currentConfig()?.range ?? 0;
  }
  get topSpeed(): number {
    return this.carServices.currentConfig()?.range ?? 0;
  }
  get baseModelPrice(): number {
    return this.carServices.currentConfig()?.price ?? 0;
  }

  toggleYoke(): void {
    this.carServices.yokeSelected.update((prev) => !prev);
  }

  toggleTowHitch(): void {
    this.carServices.towHitchSelected.update((prev) => !prev);
  }

  isConfigSelected(config: Config): boolean {
    return this.carServices.currentConfig()?.id === config.id;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
  }
  goToStep3() {
    if (!this.carServices.currentConfig()) {
      alert('Please select car configurations before proceeding.');
      return;
    }

    this.router.navigate(['/step3']);
  }
}
