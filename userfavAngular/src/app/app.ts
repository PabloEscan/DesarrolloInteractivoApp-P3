import { Component, signal, OnInit, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TarjetaUsuario } from './components/tarjeta-usuario/tarjeta-usuario';

@Component({
  imports: [TarjetaUsuario, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  protected readonly title = signal('userfavAngular');

  usuarios = signal<any[]>([]);
  busqueda = new FormControl('');
  datosfiltrados = signal<any[]>([]);
  cargando = signal<boolean>(true);

  idsFavoritos = signal<Set<number>>(new Set());
  totalFavoritos = computed(() => this.idsFavoritos().size);

  ngOnInit(): void {
    this.getPost();
    this.filtrado();
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
      this.datosfiltrados.set(datos);
      this.cargando.set(false);
    })
    .catch((err) => {
      console.error('Hubo un problema con la petición:', err);
      this.cargando.set(true);
    })
  }

  filtrado(){
  this.busqueda.valueChanges.subscribe(value => {
    const termino = (value || '').toLowerCase();
    
    const resultado = this.usuarios().filter(usuario => 
      usuario.username.toLowerCase().includes(termino)
    );
    
    this.datosfiltrados.set(resultado);
    })
  }

  handleFavoritoClick(id: number, esFavorito: boolean){
    this.idsFavoritos.update(setActual => {
      const nuevoSet = new Set(setActual);
      if (esFavorito){
        nuevoSet.add(id);
      }else{
        nuevoSet.delete(id);
      }
      return nuevoSet;
    })
  }
}
