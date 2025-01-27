import { Request, Response, NextFunction } from 'express';
import { CrudPet } from '../entities/Pet/CrudPet';

const petshopCrud = new CrudPet();

export const checkExistUserAccount = (req: Request, res: Response, next: NextFunction) => {
    const { cnpj } = req.headers;

    if (!cnpj || typeof cnpj !== 'string') {
        return res.status(404).json({ error: 'O CNPJ é obrigatório e deve ser enviado pelo header da requisição.'});
    }

    const petshop = petshopCrud['petshops'].find((ps) => ps.cnpj === cnpj);

    if (!petshop) {
        return res.status(404).json({ error: 'Nenhum petshop encontrado.'});
    }

    req.body.petshop = petshop;

    next();
}