import { Injectable } from '@angular/core';
import { HousingLocation } from '../model/housinglocation';

// esta disponible en todos los sitiso
@Injectable({
  providedIn: 'root',
})

export class HousingService {
  url = 'http://localhost:3000/locations';

  // define metodo asincrono que devuelve un array de ese componente
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    // hace petiion get a ese url
    const data = await fetch(this.url);

    // espera que la peticion termine y almacena la respuesta en data
    return (await data.json()) ?? [];
  }

  // define metodo asincrono que recibe una id y devuelve una ubicacion
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    // hace petiion get a ese url
    const data = await fetch(`${this.url}/${id}`);

    // espera que la peticion termine y almacena la respuesta en data
    return (await data.json()) ?? {};
  }

  // muestra un objeto con los datos del formulario
  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
}