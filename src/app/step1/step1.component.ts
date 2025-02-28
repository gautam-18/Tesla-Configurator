import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  carModels: CarModel[] = [
    {
      code: 'S',
      description: 'Model S',
      colors: [
        { code: 'white', description: 'Pearl White Multi-Coat', price: 0 },
        { code: 'black', description: 'Solid Black', price: 0 },
        { code: 'blue', description: 'Deep Blue Metallic', price: 0 },
        { code: 'grey', description: 'Stealth Grey', price: 0 },
        { code: 'red', description: 'Ultra Red', price: 0 },
      ],
    },
    {
      code: 'X',
      description: 'Model X',
      colors: [
        { code: 'white', description: 'Pearl White Multi-Coat', price: 0 },
        { code: 'black', description: 'Solid Black', price: 0 },
        { code: 'blue', description: 'Deep Blue Metallic', price: 0 },
        { code: 'grey', description: 'Stealth Grey', price: 0 },
        { code: 'red', description: 'Ultra Red', price: 0 },
      ],
    },
    {
      code: 'C',
      description: 'Cybertruck',
      colors: [
        { code: 'grey', description: 'Stainless Steel', price: 0 },
        { code: 'black', description: 'Satin Black', price: 6500 },
        { code: 'white', description: 'Satin White', price: 6500 },
      ],
    },
    {
      code: '3',
      description: 'Model 3',
      colors: [
        { code: 'white', description: 'Pearl White Multi-Coat', price: 1000 },
        { code: 'black', description: 'Solid Black', price: 1500 },
        { code: 'blue', description: 'Deep Blue Metallic', price: 1000 },
        { code: 'grey', description: 'Midnight Silver Metallic', price: 0 },
        { code: 'red', description: 'Red Multi-Coat', price: 2000 },
      ],
    },
    {
      code: 'Y',
      description: 'Model Y',
      colors: [
        { code: 'white', description: 'Pearl White Multi-Coat', price: 1000 },
        { code: 'black', description: 'Solid Black', price: 2000 },
        { code: 'blue', description: 'Deep Blue Metallic', price: 1000 },
        { code: 'grey', description: 'Midnight Silver Metallic', price: 0 },
        { code: 'red', description: 'Red Multi-Coat', price: 2000 },
      ],
    },
  ];

  @Input() selected: boolean = false;
  @Input() selectedCarColor: boolean = false;
  @Output() select = new EventEmitter<string>();
  @Output() colorsSelected = new EventEmitter<Color[]>();

  @Output() modelSelected = new EventEmitter<boolean>();
  @Output() colorSelected = new EventEmitter<boolean>();

  selectedCar: CarModel | undefined;
  selectedModelCode: string = '';
  selectedColor: Color | null = null;
  availableColors: Color[] = [];

  constructor(
    private router: Router,
    private configuratorService: ConfiguratorService
  ) {}

  onSelectModel(event: Event) {
    const selectedCode = (event.target as HTMLSelectElement).value;
    const selectedModel = this.carModels.find(
      (model) => model.code === selectedCode
    );

    if (selectedModel) {
      this.selectedCar = selectedModel;
      this.selectedModelCode = selectedModel.code;
      this.availableColors = selectedModel.colors;
      this.select.emit(this.selectedModelCode);
      this.colorsSelected.emit(this.availableColors);
      this.selected = true;
      console.log('Selected Model:', selectedModel);
      this.modelSelected.emit(true);
      this.configuratorService.setSelectedCarModel({
        code: selectedCode,
        colors: this.availableColors,
        description: '',
      });
    }
  }

  onSelectColor(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      const selectedColorObj = this.availableColors.find(
        (color) => color.code === target.value
      );

      if (selectedColorObj) {
        this.selectedColor = selectedColorObj;
        console.log('Selected Color:', this.selectedColor);
        this.selectedCarColor = true;
        this.colorSelected.emit(true);
        this.configuratorService.setSelectCarColor(selectedColorObj);
      }
    }
  }

  goToStep2() {
    if (!this.selectedCar || !this.selectedColor) {
      alert('Please select a car model and color before proceeding.');
      return;
    }

    this.configuratorService.setSelectedCar(
      this.selectedCar,
      this.selectedColor
    );
    console.log('Car saved:', this.selectedCar, this.selectedColor);

    this.router.navigate(['/step2']);
  }

  get imageUrl(): string {
    return this.selectedCar && this.selectedColor
      ? `https://interstate21.com/tesla-app/images/${this.selectedCar.code}/${this.selectedColor.code}.jpg`
      : '';
  }
}
