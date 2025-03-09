import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';
import { CarModel, Color } from '../models.type';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component {
  private carService = inject(ConfiguratorService);
  carModels = this.carService.allModels;
  @Input() selected: boolean = false;
  @Input() selectedCarColor: boolean = false;
  private router = inject(Router);
  onSelectModel(event: Event) {
    const selectedCode = (event.target as HTMLSelectElement).value;
    const selectedModel = this.carModels().find(
      (model) => model.code === selectedCode
    );

    if (selectedModel) {
      this.selected = true;
      this.carService.setSelectedCarModel({
        code: selectedModel.code,
        colors: selectedModel.colors,
        description: '',
      });
    }
  }
  get availableColors(): Color[] {
    return this.carService.currentCar()?.colors ?? [];
  }

  onSelectColor(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      const selectedColorObj = this.availableColors.find(
        (color) => color.code === target.value
      );

      if (selectedColorObj) {
        this.selectedCarColor = true;
        this.carService.setSelectCarColor(selectedColorObj);
      }
    }
  }

  goToStep2() {
    if (!this.selected || !this.selectedCarColor) {
      alert('Please select a car model and color before proceeding.');
      return;
    }

    this.router.navigate(['/step2']);
  }

  get imageUrl(): string {
    return this.selected && this.selectedCarColor
      ? `https://interstate21.com/tesla-app/images/${
          this.carService.currentCar()!.code
        }/${this.carService.currentColor()?.code}.jpg`
      : '';
  }
}
