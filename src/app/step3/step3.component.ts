import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from '../configurator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3',
  imports: [CommonModule, FormsModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  configuratorService = inject(ConfiguratorService);

  get modelCode(): string {
    return this.configuratorService.currentCar()?.code || '';
  }

  get modelDescription(): string {
    return this.configuratorService.currentCar()?.description || '';
  }

  get colorDescription(): string {
    return this.configuratorService.currentColor()?.description || '';
  }

  get carImageUrl(): string {
    const modelCode = this.configuratorService.currentCar()?.code || '';
    const colorCode = this.configuratorService.currentColor()?.code || '';

    return modelCode && colorCode
      ? `https://interstate21.com/tesla-app/images/${modelCode}/${colorCode}.jpg`
      : '';
  }

  get seelctedConfig() {
    return this.configuratorService.currentConfig()?.description;
  }

  get towHitch(): boolean {
    if (this.configuratorService.towHitchSelected()) {
      return true;
    } else {
      return false;
    }
  }

  get yoke(): boolean {
    if (this.configuratorService.yokeSelected()) {
      return true;
    } else {
      return false;
    }
  }

  get range(): number {
    return this.configuratorService.currentConfig()?.range ?? 0;
  }
  get topSpeed(): number {
    return this.configuratorService.currentConfig()?.speed ?? 0;
  }
  get baseModelPrice(): number {
    return this.configuratorService.currentConfig()?.price ?? 0;
  }
  get ColorPrice(): number {
    return this.configuratorService.currentColor()?.price ?? 0;
  }
  get totalPrice(): number {
    let total = this.baseModelPrice + this.ColorPrice;

    if (this.yoke) {
      total += 1000;
    }

    if (this.towHitch) {
      total += 1000;
    }

    return total;
  }
}
