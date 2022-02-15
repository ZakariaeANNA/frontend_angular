<<<<<<< HEAD
import { Arbitre } from "./arbitre";
import { Equipe } from "./equipe";
import { Stade } from "./stade";

export interface Matche{
    idMatch : number,
    dateMatch : String,
    heureMatch : String,
    arbitre : Arbitre,
    stade : Stade,
    equipes : Equipe[]

=======
import {Arbitre} from './arbitre';
import {Stade} from './stade';
import { Equipe } from './equipe';

export interface Matche {
    idMatch : number;
    dateMatch : string;
    heureMatch : string;
    arbitre : Arbitre;
    stade : Stade;
    equipes : Equipe[];
>>>>>>> c009cefb32849edb7a1f963b6522f38ee943796c
}