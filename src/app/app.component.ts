import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ConfiguratorService } from './configurator.service';
import { computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CarModel, Color, Config, CarOptions } from './models.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: 'app.component.html',
  // styles: [
  //   `
  //     .navBar {
  //       background: #111111;
  //       padding: 1rem;
  //       color: white;
  //       width: 70%;
  //     }
  //     .wrapper {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       height: 12rem;
  //     }

  //     nav button {
  //       text-decoration: none;
  //       color: #333;
  //       border-radius: 4px;
  //       background: #f0f0f0;
  //     }

  //     nav a.active {
  //       background: #3366cc;
  //       color: white;
  //     }
  //   `,
  // ],
  styles: [
    `
      .containerOne {
        background: black;
        min-height: 100vh;
        border: 0px !important;
      }
      app-root {
        background: black;
        background-color: black;
      }
      nav {
        display: flex;
        width: 60vw;
        justify-content: center;
        background-color: black;
        border: 0px !important;
        position: relative;
      }
      .wrapper {
        background-color: black;
        display: flex;
        justify-content: center;
        border: 0px !important;
        z-index: 10000;
      }
      header {
        min-height: 5vh;
      }
      nav button {
        background-color: #252525;
        border: 1px solid #ffffff90;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff90;
        font-size: 0.7rem;
        width: 20vw;
        height: 2rem;
      }
      nav button:hover {
        background: #444444;
      }
      body,
      html {
        background: black;
        background-color: black;
      }

      nav,
      header,
      .navBar,
      .wrapper {
        border: 0px !important;
        background: black !important;
      }

      main {
        position: relative;
        top: 2rem;
      }
    `,
  ],
})
export class AppComponent {
  name = 'Angular';
  constructor(private configService: ConfiguratorService) {}

  selected = computed(
    () => this.configService.currentCar()?.code !== undefined
  );
  selectedCarColor = computed(
    () => this.configService.currentColor()?.code !== undefined
  );

  // constructor(private configuratorService: ConfiguratorService) {}
  configuratorService = new ConfiguratorService();
  selectedCar = this.configuratorService.getSelectedCar();
  exists = this.configuratorService.getIfExists();
  goToStep2() {
    console.log(this.exists);
    console.log('IINN', this.selectedCar);
    // if (!this.selectedCar || !this.selectedCar.color) {
    //   alert('Please select a car model and color before proceeding.');
    //   return;
    // }
    // if (!this.exists) {
    //   alert('Please select a car model and color before proceeding.');
    //   return;
    // }
    console.log(this.selectedCar.model);
    if (this.selectedCar.model) {
      this.configuratorService.setSelectedCar(
        this.selectedCar.model,
        this.selectedCar.color!
      );
    }
    console.log('Car saved:', this.selectedCar, this.selectedCar.color);

    //   this.router.navigate(['/step2']);
    // }
  }
}
