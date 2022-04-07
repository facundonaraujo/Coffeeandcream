import { Role } from '../models/enums.model'

export class Usuario{
    constructor(
        public _id?: number,
        public email?: string,
        public password?: string,
        public nombre?: string,
        public role?: Role,
        public tel?: string,
        public direccion?: string,
    ){}
}

export interface LoginPayload{
    email: string, 
    password: string
}
export interface ChangePasswordPayload{
    oldpassword: string, 
    newpassword: string
}