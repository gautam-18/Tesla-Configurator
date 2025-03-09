import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ConfiguratorService } from './configurator.service';
import { computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: 'app.component.html',

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

  configuratorService = new ConfiguratorService();
  selectedCar = this.configuratorService.getSelectedCar();
  exists = this.configuratorService.getIfExists();
  goToStep2() {
    if (this.selectedCar.model) {
      this.configuratorService.setSelectedCar(
        this.selectedCar.model,
        this.selectedCar.color!
      );
    }
    console.log('Car saved:', this.selectedCar, this.selectedCar.color);
  }
}
