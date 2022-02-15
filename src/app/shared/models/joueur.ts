import { Equipe } from "./equipe";

export interface Joueur{
    idJoueur : number,
    nomJoueur : String,
    poste : String,
    equipe: Equipe
}