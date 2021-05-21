import { Aplicacion, AplicacionState } from '../models/aplicacion.model';
import * as fromAplicacion from './aplicacion.accions';

const estadoInicial: Aplicacion = new Aplicacion();

export function AplicacionReducer(state = estadoInicial,action:fromAplicacion.acciones):AplicacionState{
    //console.log(action);
    switch(action.type){
        //   APP USUARIO ---------------------------------------------------------------------------------------------------------
        case fromAplicacion.SET_USUARIO:
            let nuevoUsuario = { ...state };
            nuevoUsuario.usuario = { ...action.usuario };
            localStorage.setItem('aplicacion', JSON.stringify(nuevoUsuario));
            localStorage.setItem('usuario', JSON.stringify(nuevoUsuario.usuario));
            return nuevoUsuario;
        case fromAplicacion.QUIT_USUARIO:
            let quitUsuario = { ...state };
            quitUsuario.usuario = null;
            localStorage.setItem('aplicacion', JSON.stringify(quitUsuario));
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            return quitUsuario;
        //   APP PAGINADOR ---------------------------------------------------------------------------------------------------------
        case fromAplicacion.SET_PAGINADOR:
            let paginador = { ...state };
            paginador.paginador = { ...action.paginador };
            localStorage.setItem('aplicacion', JSON.stringify(paginador));
            return paginador;
        case fromAplicacion.QUIT_PAGINADOR:
            let quitPaginador = { ...state };
            quitPaginador.paginador = null;
            localStorage.setItem('aplicacion', JSON.stringify(quitPaginador));
            return quitPaginador;
        //   APP ---------------------------------------------------------------------------------------------------------
        case fromAplicacion.SET_APLICACION:
            let nuevoApp = {... action.app};
            localStorage.setItem('aplicacion', JSON.stringify(nuevoApp));
            return nuevoApp
        case fromAplicacion.QUIT_APLICACION:
        return new Aplicacion();
        default:
            return state;
    }
}
