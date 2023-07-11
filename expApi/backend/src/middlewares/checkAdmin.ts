import { Request, Response, NextFunction } from 'express';
import { TiposUsuarios } from '../resources/tipoUsuario/tipoUsuario.types';

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session.tipoUsuarioId)
    console.log(TiposUsuarios.ADMIN)
    if (req.session.tipoUsuarioId === TiposUsuarios.ADMIN){
        next();
    }
    else return res.status(400).json({ msg: "Operação não permitida !"})
};

export default checkAdmin;
