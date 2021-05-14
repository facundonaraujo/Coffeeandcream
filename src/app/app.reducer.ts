
import { ActionReducerMap } from '@ngrx/store';
import { Aplicacion } from './models/aplicacion.model';
import * as fromApp from './reducers/aplicacion/aplicacion.reducer';

export interface AppState{
    app : Aplicacion,
}

export const appReducers: ActionReducerMap<AppState> = {
    app: fromApp.AplicacionReducer
};
