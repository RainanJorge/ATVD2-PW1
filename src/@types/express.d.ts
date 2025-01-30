import { Pet } from "../entities/Pet/Pet";

type User = {
    id: string;
    cpf: string;
    name: string;
    pets: Pet[];
}

declare namespace Express {
    export interface Request {
        usuario: User;
    }
}