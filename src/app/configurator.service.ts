import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, Color, Config, CarOptions } from './models.type';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private http = inject(HttpClient);

  // Models data
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  // Inside ConfiguratorService

  // Make sure you have these signals defined

  // And these methods to update them

  setSelectedConfig(config: Config): void {
    this.currentConfig.set(config);
  }

  // Add this method to reset configurations when needed
  resetConfigurations(): void {
    this.currentConfig.set(undefined);
    this.yokeSelected.set(false);
    this.towHitchSelected.set(false);
  }

  // Current selections as signals
  currentCar = signal<CarModel | undefined>(undefined);
  readonly currentColor = signal<Color | undefined>(undefined);
  readonly currentConfig = signal<Config | undefined>(undefined);
  yokeSelected = signal<boolean>(false);
  readonly towHitchSelected = signal<boolean>(false);

  // ✅ **NEW: Store Selected Car and Color from Step 1**
  setSelectedCar(model: CarModel, color: Color): void {
    this.currentCar.set(model);
    this.currentColor.set(color);
    console.log('Car & Color Set:', model, color); // Debugging log
  }
  setSelectedCarModel(model: CarModel): void {
    this.currentCar.set(model);
    console.log('SELECTED CAR MODEL', this.currentCar());
  }
  setSelectCarColor(color: Color): void {
    this.currentColor.set(color);
    console.log('SELECTED CAR COLOR', this.currentColor());
  }
  getIfExists(): boolean {
    if (this.currentColor()?.code && this.currentCar()?.code) {
      return true;
    }
    return false;
  }
  // // ✅ **NEW: Retrieve Selected Car and Color in Step 2**
  getSelectedCar(): { model?: CarModel; color?: Color } {
    return {
      model: this.currentCar(),
      color: this.currentColor(),
    };
  }

  // Fetch car options for a specific model
  getCarOptions(modelCode: string): Observable<CarOptions> {
    return this.http.get<CarOptions>(`options/${modelCode}`);
  }

  // Helper method for guard
  isCarAndColorSelected(): boolean {
    return !!this.currentCar() && !!this.currentColor();
  }

  // Helper method to set car model (resets other selections)
  // setCurrentCar(car: CarModel): void {
  //   this.currentCar.set(car);
  //   this.currentConfig.set(undefined);
  //   this.yokeSelected.set(false);
  //   this.towHitchSelected.set(false);
  // }

  // Helper to calculate total price
  // calculateTotalPrice(): number {
  //   let total = 0;

  //   // Add base price from config
  //   if (this.currentConfig()) {
  //     total += this.currentConfig()!.price;
  //   }

  //   // Add color price
  //   if (this.currentColor()) {
  //     total += this.currentColor()!.price;
  //   }

  //   // Add options
  //   if (this.yokeSelected()) {
  //     total += 1000;
  //   }

  //   if (this.towHitchSelected()) {
  //     total += 1000;
  //   }

  //   return total;
  // }
}
