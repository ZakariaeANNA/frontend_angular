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
}