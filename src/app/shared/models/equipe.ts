<<<<<<< HEAD
import { Joueur } from "./joueur";
import { Matche } from "./matche";

export interface Equipe{
    idEquipe : number,
    nomEquipe : String,
    pays : String,
    matches : Matche[],
    joueurs : Joueur[]
=======
import {Matche} from './matche';
import {Joueur} from './joueur';

export interface Equipe {
    idEquipe : number;
    nomEquipe : string;
    pays : string;
    matches : Matche[];
    joueurs : Joueur[];
>>>>>>> c009cefb32849edb7a1f963b6522f38ee943796c
}