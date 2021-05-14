import {Action} from '@ngrx/store';
import { Aplicacion } from '../../models/aplicacion.model';
import { PaginadorTabla } from '../../models/paginador.model';
import { Usuario } from '../../models/usuario.model';

export const SET_APLICACION_USUARIO = '[AplicacionUsuario] Set AplicacionUsuario';
export const QUIT_APLICACION_USUARIO = '[AplicacionUsuario] Quit AplicacionUsuario';

export const SET_APLICACION = '[Aplicacion] Set Aplicacion';
export const QUIT_APLICACION = '[Aplicacion] Quit Aplicacion';

export const SET_APLICACION_PAGINADOR = '[AplicacionPaginador] Set AplicacionPaginador';
export const QUIT_APLICACION_PAGINADOR = '[AplicacionPaginador] Quit AplicacionPaginador';

export class SetAplicacionUserAction implements Action{
    readonly type = SET_APLICACION_USUARIO;
    constructor (public usuario : Usuario){}
}

export class QuitAplicacionUserAction implements Action{
    readonly type = QUIT_APLICACION_USUARIO;
    constructor (public usuario : Usuario){}
}

export class SetAplicacionAction implements Action{
    readonly type = SET_APLICACION;
    constructor (public app : Aplicacion){}
}

export class QuitAplicacionAction implements Action{
    readonly type = QUIT_APLICACION;
    constructor (public app : Aplicacion){}
}

//   APP PAGINADOR ---------------------------------------------------------------------------------------------------------
export class SetAplicacionPaginadorAction implements Action{
    readonly type = SET_APLICACION_PAGINADOR;
    constructor (public paginador : PaginadorTabla){}
}
export class QuitAplicacionPaginadorAction implements Action{
    readonly type = QUIT_APLICACION_PAGINADOR;
    constructor (){}
}

export type acciones = SetAplicacionUserAction  |  QuitAplicacionUserAction | SetAplicacionAction  
|  QuitAplicacionAction | SetAplicacionPaginadorAction | QuitAplicacionPaginadorAction;
