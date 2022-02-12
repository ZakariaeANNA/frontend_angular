import {Matche} from './matche';

export interface Arbitre {
    idArbitre : number;
    nom : string;
    nationalite : string;
    Matches : Matche[];
}