import { Component, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../model/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Map, tileLayer, marker } from 'leaflet';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {
  housingLocation!: HousingLocation;
  private map: Map | null = null;


  // pilla los valores puestos en cada formControlName y el formGroup
  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private route: ActivatedRoute, private housingService: HousingService, private cdr: ChangeDetectorRef) {
    // pillo el dato puesto abajo en el localStorage
    const savedFormData = localStorage.getItem('formData');

    if (savedFormData) {
      // le asigno esos valores al formulario directamente
      this.applyForm.setValue(JSON.parse(savedFormData));
    }
    // almacena el numero de id de la ruta actual
    this.route.paramMap.subscribe(params => {
      const housingLocationId = Number(params.get('id'));
      this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
        this.housingLocation = housingLocation!;
        this.cdr.detectChanges()
        this.mostrarMapas()

      });
    });

  }



  // se activa al darle al boton para agregarlo al localStorage
  submitApplication() {
    localStorage.removeItem('formData');
    if (this.applyForm.valid) {
      const formData = this.applyForm.value;
      // si quiero almacenarlo en un array,
      //  creo una interfaz con los datos del formulario 
      // y declaro arriba una variable para hacer push aqui cada vez

      // Guardar los datos en LocalStorage
      localStorage.setItem('formData', JSON.stringify(formData));

      // Llamar al servicio (si aplica)
      this.housingService.submitApplication(
        formData.firstName ?? '',
        formData.lastName ?? '',
        formData.email ?? ''
      );

      alert('Se ha agregado el usuario');
    }
  }


  // MOSTRAR MAPA
  async mostrarMapas(): Promise<void> {
      if (this.housingLocation?.coordinates) {
        const { Map, tileLayer, marker } = await import('leaflet');
        if (this.map) {
          this.map.remove();
          this.map = null;
        }

        this.map = new Map('map').setView(
          [this.housingLocation.coordinates.latitude, this.housingLocation.coordinates.longitude],
          13
        );

        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        marker([this.housingLocation.coordinates.latitude, this.housingLocation.coordinates.longitude])
          .addTo(this.map)
          .bindPopup('Ubicación de la Vivienda')
          .openPopup();
      }
    }
  }