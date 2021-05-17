import {Action} from '@ngrx/store';
import { Aplicacion } from '../models/aplicacion.model';
import { PaginadorTabla } from '../models/paginador.model';
import { Usuario } from '../models/usuario.model';

export const SET_APLICACION = '[Aplicacion] Set Aplicacion';
export const QUIT_APLICACION = '[Aplicacion] Quit Aplicacion';

export const SET_USUARIO = 'Usuario] SetUsuario';
export const QUIT_USUARIO = 'Usuario] QuitUsuario';

export const SET_PAGINADOR = 'Paginador] SetPaginador';
export const QUIT_PAGINADOR = 'Paginador] QuitPaginador';

//  USUARIO ---------------------------------------------------------------------------------------------------------
export class SetUsuarioAction implements Action{
    readonly type = SET_USUARIO;
    constructor (public usuario : Usuario){}
}

export class QuitUsuarioAction implements Action{
    readonly type = QUIT_USUARIO;
    constructor (public usuario : Usuario){}
}

//  APP ---------------------------------------------------------------------------------------------------------
export class SetAplicacionAction implements Action{
    readonly type = SET_APLICACION;
    constructor (public app : Aplicacion){}
}

export class QuitAplicacionAction implements Action{
    readonly type = QUIT_APLICACION;
    constructor (){}
}

//  PAGINADOR ---------------------------------------------------------------------------------------------------------
export class SetPaginadorAction implements Action{
    readonly type = SET_PAGINADOR;
    constructor (public paginador : PaginadorTabla){}
}
export class QuitPaginadorAction implements Action{
    readonly type = QUIT_PAGINADOR;
    constructor (){}
}

export type acciones = SetUsuarioAction  |  QuitUsuarioAction | SetAplicacionAction  
|  QuitAplicacionAction | SetPaginadorAction | QuitPaginadorAction;
