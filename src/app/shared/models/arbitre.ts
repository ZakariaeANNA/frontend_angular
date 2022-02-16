import { Matche } from "./matche";

export interface Arbitre{
    idArbitre : number,
    nom : String,
    Nationalite : String,
    Matches : Matche[]
}