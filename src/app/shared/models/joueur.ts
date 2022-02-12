import { Equipe } from "./equipe";


export interface Joueur {
    idJoueur : number;
    nomJoueur : string;
    poste : string;
    equipe : Equipe;
}