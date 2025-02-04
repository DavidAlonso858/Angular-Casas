import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  // Importacion del otro componente 
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>

    <section class="results">
    <!--Importacion del otro componente recorriendo el array 
    del atributo declarado abajo por eso la directiva ngFor -->
    <app-housing-location  *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"/>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}