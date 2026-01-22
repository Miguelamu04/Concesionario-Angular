import { Component } from '@angular/core';
import { CocheService } from 'src/app/service/coche.service';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css']
})
export class CocheComponent {

  listaCoches: any[] = [];
  marca: string = "";
  precio: number = 0;

  // NUEVAS PROPIEDADES PARA GESTIONAR LA EDICIÓN
  editando: boolean = false;
  idEditando: number | null = null;

  constructor(private servicioCoche: CocheService){}

  ngOnInit(){
    this.listaCoches = this.servicioCoche.getCoches();
  }

  addCoche(){
    if(this.marca.length > 2 && this.precio > 5){
      this.servicioCoche.addCoche(this.marca, this.precio);
      this.limpiarFormulario(); // Limpiar después de añadir
    }
  }

  // --- NUEVA FUNCIÓN: ELIMINAR ---
  eliminarCoche(id: number) {
    if (confirm('¿Desea retirar este vehículo del inventario?')) {
      this.servicioCoche.eliminarCoche(id);
      // Refrescamos la lista desde el servicio
      this.listaCoches = this.servicioCoche.getCoches();
    }
  }

  // --- NUEVA FUNCIÓN: PREPARAR EDICIÓN ---
  prepararEdicion(coche: any) {
    this.editando = true;
    this.idEditando = coche.id;
    this.marca = coche.marca;
    this.precio = coche.precio;
  }

  // --- NUEVA FUNCIÓN: GUARDAR CAMBIOS ---
  guardarCambios() {
    if(this.marca.length > 2 && this.precio > 5 && this.idEditando !== null) {
      this.servicioCoche.modificarCoche(this.idEditando, this.marca, this.precio);
      this.cancelarEdicion();
      // Refrescamos la lista
      this.listaCoches = this.servicioCoche.getCoches();
    }
  }

  // --- NUEVA FUNCIÓN: CANCELAR / LIMPIAR ---
  cancelarEdicion() {
    this.editando = false;
    this.idEditando = null;
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.marca = "";
    this.precio = 0;
  }
}
