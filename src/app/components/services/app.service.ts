import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Aplicacion } from 'src/app/models/aplicacion.model';
import { PaginadorTabla } from 'src/app/models/paginador.model';
import { Usuario } from 'src/app/models/usuario.model';
import { SetUsuarioAction,  
         QuitUsuarioAction, 
         SetAplicacionAction,  
         QuitAplicacionAction, 
         SetPaginadorAction, 
         QuitPaginadorAction 
} from '../../reducers/aplicacion.accions';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  app : Aplicacion = new Aplicacion();
  usuario : Usuario = new Usuario ();

  constructor(
    private store: Store<AppState>,
    public http: HttpClient,
  ) { }

  crearSubcriber (){
    return this.store.select('app');
  }

  cambiarUsuario ( nuevoUsuario: Usuario ){
     this.store.dispatch(new SetUsuarioAction(nuevoUsuario));
  }

  quitarUsuario(usuario : Usuario){
    this.store.dispatch(new QuitUsuarioAction(usuario));
  }

  cambiarPaginador ( paginador: PaginadorTabla ){
    this.store.dispatch(new SetPaginadorAction(paginador));
  }

  quitarPaginador (){
    this.store.dispatch(new QuitPaginadorAction());
  }

  cambiarApp ( app: Aplicacion ){
    this.store.dispatch(new SetAplicacionAction(app));
  }

  quitarApp (){
    this.store.dispatch(new QuitAplicacionAction());
  }

  cargarStorage() {
    if (localStorage.getItem('aplicacion')) {
        this.app = JSON.parse(localStorage.getItem('aplicacion'));
        this.store.dispatch(new SetAplicacionAction(this.app));
    } else {
      this.app = null;
    }
  }

}
