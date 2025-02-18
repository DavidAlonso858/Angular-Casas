import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../model/housinglocation';
import { HousingService } from '../../services/housing.service';
@Component({
  selector: 'app-home',
  // Importacion del otro componente 
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  // array de la interfaz
  housingLocationList: HousingLocation[] = [];


  // array nuevo en el que voy a filtrar
  filteredLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) {

    // es lo mismo que el subscribe pero con fetch
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList; // luego en el metodo filtro
    });
  
  }

  // le paso el value del filter (texto escrito)
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