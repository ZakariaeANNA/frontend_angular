import { Matche } from "./matche";

export interface Stade{
    idStade  : number,
    nomStade : String,
    villeStade : String,
    matches : Matche[]
}