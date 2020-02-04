import { UsuarioEnt } from "./usuarioEnt";
import { Animal } from './animal';

export class Mensaje {
    mensaje: String;
    valido: boolean;
    usuario: UsuarioEnt;
    animales: Animal[];
}
