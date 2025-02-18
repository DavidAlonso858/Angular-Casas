import { Component,  Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocation} from '../../model/housinglocation';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterModule],
  templateUrl:'./housing-location.component.html',
  styleUrl: './housing-location.component.css'
})

export class HousingLocationComponent {
  // pilla los datos del padre que se encuentra en home-list 
  // (el ! dice que confie que va a tener un valor)
  @Input() housingLocation!: HousingLocation;
}
