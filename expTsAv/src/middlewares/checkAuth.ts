import { Request, Response, NextFunction } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const logado = req.cookies['logado'];
    if (!logado) res.redirect('/login');
    else next();
};
export default checkAuth;