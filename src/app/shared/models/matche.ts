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
}