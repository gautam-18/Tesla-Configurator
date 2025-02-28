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
  selectedConfig: Config | null = null;
  yokeSelected: boolean = false;
  towHitchSelected: boolean = false;

  constructor(
    private router: Router,
    private configuratorService: ConfiguratorService
  ) {}

  get modelCode(): string {
    return this.configuratorService.currentCar()?.code || '';
  }

  get modelDescription(): string {
    return this.configuratorService.currentCar()?.description || '';
  }

  get colorDescription(): string {
    return this.configuratorService.currentColor()?.description || '';
  }

  get totalPrice(): number {
    let total = 0;

    if (this.selectedConfig) {
      total += this.selectedConfig.price;
    }

    if (this.configuratorService.currentColor()) {
      total += this.configuratorService.currentColor()!.price;
    }

    if (this.yokeSelected) {
      total += 1000;
    }

    if (this.towHitchSelected) {
      total += 1000;
    }

    return total;
  }

  get carImageUrl(): string {
    const modelCode = this.configuratorService.currentCar()?.code || '';
    const colorCode = this.configuratorService.currentColor()?.code || '';

    return modelCode && colorCode
      ? `https://interstate21.com/tesla-app/images/${modelCode}/${colorCode}.jpg`
      : '';
  }

  ngOnInit(): void {
    this.loadCarOptions();
  }

  loadCarOptions(): void {
    const modelCode = this.configuratorService.currentCar()?.code;

    if (modelCode) {
      this.configuratorService.getCarOptions(modelCode).subscribe({
        next: (options) => {
          this.carOptions = options;
          // Reset selections when loading new options
          this.selectedConfig = null;
          this.yokeSelected = false;
          this.towHitchSelected = false;
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
      this.selectConfig(selected);
    }
  }
  get range(): number {
    return this.configuratorService.currentConfig()?.range ?? 0;
  }
  get topSpeed(): number {
    return this.configuratorService.currentConfig()?.range ?? 0;
  }
  get baseModelPrice(): number {
    return this.configuratorService.currentConfig()?.price ?? 0;
  }

  selectConfig(config: Config): void {
    this.selectedConfig = config;
    this.configuratorService.currentConfig.set(config);
  }
  OnselectConfig(config: Config): void {
    this.selectedConfig = config;
    this.configuratorService.currentConfig.set(config);
  }

  toggleYoke(): void {
    this.yokeSelected = !this.yokeSelected;
    this.configuratorService.yokeSelected.set(this.yokeSelected);
  }

  toggleTowHitch(): void {
    this.towHitchSelected = !this.towHitchSelected;
    this.configuratorService.towHitchSelected.set(this.towHitchSelected);
  }

  isConfigSelected(config: Config): boolean {
    return this.selectedConfig?.id === config.id;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
  }
  goToStep3() {
    if (!this.selectedConfig) {
      alert('Please select a car model and color before proceeding.');
      return;
    }

    this.router.navigate(['/step3']);
  }
}
