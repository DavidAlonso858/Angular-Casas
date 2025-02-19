import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../model/housinglocation';

@Component({
  selector: 'app-formulario-casas',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-casas.component.html',
  styleUrl: './formulario-casas.component.css'
})

export class FormularioCasasComponent {
  casas: HousingLocation[] = []
  casaForm: FormGroup;

  constructor(private fb: FormBuilder, private housingService: HousingService) {
    this.casaForm = this.fb.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      photo: [''],
      availableUnits: ['', [Validators.required]],
      sistemasSeguridad: ['', [Validators.required]],

    })
  }

  ngOnInit() {
    this.housingService.getEventos().subscribe((casa) => {
      this.casas = casa;
      console.log(this.casas);
    });
  }

  onSubmit() {
    if (this.casaForm.valid) { // si los datos introducidos son validos
      this.housingService.getEventos().subscribe(eventos => {
        const newId = Number(eventos[eventos.length - 1].id) + 1

        const idString = String(newId)

        const newEvent: HousingLocation = { // creo un evento con una id unica
          id: idString,
          coordinates: [],
          wifi: true,
          laundry: true,
          ...this.casaForm.value,
        };

        this.housingService.addEvento(newEvent).subscribe(() => {
          this.casas.push(newEvent);
          this.casaForm.reset();
        });
      });
    }
  }
}
