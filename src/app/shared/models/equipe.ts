import { Joueur } from "./joueur";
import { Matche } from "./matche";

export interface Equipe{
    idEquipe : number,
    nomEquipe : String,
    pays : String,
    matches : Matche[],
    joueurs : Joueur[]
}