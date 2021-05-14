import { Usuario } from '../models/usuario.model';
import { PaginadorTabla } from './paginador.model';

export interface AplicacionState{
  usuario ?: Usuario,
  paginador ?: PaginadorTabla
}

export class Aplicacion implements AplicacionState{
    constructor(
      public usuario ?: Usuario,
      public paginador ?: PaginadorTabla
    ){}
  }