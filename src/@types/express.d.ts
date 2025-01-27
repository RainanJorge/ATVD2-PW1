type User = {
    id: string;
    cpf: string;
    name: string;
    books: Book[];
}

declare namespace Express {
    export interface Request {
        usuario: User;
    }
}