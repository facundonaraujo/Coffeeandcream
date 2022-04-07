import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

export const generarJwt = (usuario: Usuario) => {
    return new Promise<string>((resolve, reject) => {
        
        const token = signToken(usuario, environment.JWT_KEY);

        if (token) {
            resolve(token);
        } else {
            reject('Se produjo un error al crear el Token');
        }
        
    });
}

function base64url(source: any) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');

    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}

function encodeToken(payload:any) {
    var header = {
      "alg": "HS256",
      "typ": "JWT"
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    var encodedData = base64url(stringifiedData);

    var token = encodedHeader + "." + encodedData;

    return token;
}

function signToken(payload:any, key:string) {
    var secret = key;
    let token:any = encodeToken(payload);

    var signature:any = CryptoJS.HmacSHA256(token, secret);
    signature = base64url(signature);

    var signedToken = token + "." + signature;
    return signedToken;
}
