import {Matche} from './matche';
import {Joueur} from './joueur';

export interface Equipe {
    idEquipe : number;
    nomEquipe : string;
    pays : string;
    matches : Matche[];
    joueurs : Joueur[];
}