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
            localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
            return nuevoUsuario;
        case fromAplicacion.QUIT_USUARIO:
            let quitUsuario = { ...state };
            quitUsuario.usuario = null;
            localStorage.removeItem('usuario');
            return quitUsuario;
        //   APP PAGINADOR ---------------------------------------------------------------------------------------------------------
        case fromAplicacion.SET_PAGINADOR:
            let paginador = { ...state };
            paginador.paginador = { ...action.paginador };
            return paginador;
        case fromAplicacion.QUIT_PAGINADOR:
            let quitPaginador = { ...state };
            quitPaginador.paginador = null;
            return quitPaginador;
        //   APP ---------------------------------------------------------------------------------------------------------
        case fromAplicacion.SET_APLICACION:
            let nuevoApp = {... action.app};
            localStorage.setItem('aplicacion', JSON.stringify(nuevoUsuario));
            return nuevoApp
        case fromAplicacion.QUIT_APLICACION:
        return new Aplicacion();
        default:
            return state;
    }
}
