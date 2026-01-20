import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private listaCoches = [
      {id: 1, marca: 'Audi', precio: 10000},
      {id: 2, marca: 'Seat', precio: 5000},
      {id: 3, marca: 'BMW', precio: 3000}
    ]
  constructor() {}
    getCoches(){
      return this.listaCoches;
    }
}
