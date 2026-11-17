import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-tarjeta-usuario',
  standalone: true,
  templateUrl: './tarjeta-usuario.html',
  styleUrl: './tarjeta-usuario.css',
})

export class TarjetaUsuario {
  nombre = input.required<string>();
  usuario = input.required<string>();
  email = input.required<string>();
  empresa = input.required<string>();
  ciudad = input.required<string>();

  calle = input.required<string>();
  apartamento = input.required<string>();

  mostrarDetalles = signal<boolean>(false);

  toogleDetalles() : void {
    this.mostrarDetalles.update(valorActual => !valorActual);
  }
}