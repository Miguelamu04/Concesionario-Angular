import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private listaCoches = [
    { id: 1, marca: 'Audi', precio: 10000 },
    { id: 2, marca: 'Seat', precio: 5000 },
    { id: 3, marca: 'BMW', precio: 3000 }
  ];

  constructor() {}

  getCoches() {
    return this.listaCoches;
  }

  addCoche(marca: string, precio: number) {
    // Generar un ID único basado en el valor más alto para evitar duplicados al borrar/añadir
    const nuevoId = this.listaCoches.length > 0
      ? Math.max(...this.listaCoches.map(c => c.id)) + 1
      : 1;

    const newCoche = { id: nuevoId, marca, precio };
    this.listaCoches.push(newCoche);
  }

  // --- NUEVO MÉTODO: ELIMINAR ---
  eliminarCoche(id: number) {
    this.listaCoches = this.listaCoches.filter(coche => coche.id !== id);
  }

  // --- NUEVO MÉTODO: MODIFICAR ---
  modificarCoche(id: number, marca: string, precio: number) {
    const index = this.listaCoches.findIndex(coche => coche.id === id);
    if (index !== -1) {
      this.listaCoches[index] = { id, marca, precio };
    }
  }
}
