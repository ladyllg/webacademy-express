import { Request, Response, NextFunction } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.uid) next();
  else return res.status(400).json({ msg: "User não esta logado"})
};

export default checkAuth;
