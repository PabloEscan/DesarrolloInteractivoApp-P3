import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaUsuario } from './components/tarjeta-usuario/tarjeta-usuario';
@Component({
  imports: [RouterOutlet, TarjetaUsuario],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  protected readonly title = signal('userfavAngular');

  usuarios = signal<any[]>([]);

  ngOnInit(): void {
    console.log('Iniciando');
    this.getPost();
  }

  getPost(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((respuesta) => {
      if(!respuesta.ok){
        throw new Error('Error al cargar los usuarios.');
      }
      return respuesta.json();
    })
    .then((datos) =>  {
      this.usuarios.set(datos);
    })
    .catch((err) => {
      console.error('Hubo un problema con la petición:', err);
    })
  }
}
