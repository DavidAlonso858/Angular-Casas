import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../model/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'node:console';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {
  housingLocation: HousingLocation | undefined;
  
  // pilla los valores puestos en cada formControlName y el formGroup
  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private route: ActivatedRoute, private housingService: HousingService) {
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
        this.housingLocation = housingLocation;

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

}
