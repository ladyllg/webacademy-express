import { Request, Response } from 'express';
import { buscaUsuarioPorEmail, createUsuario, deleteUser, listUsuarios, readUsuario, updateUser } from './usuario.service';
import bcrypt from 'bcryptjs'
import { Usuario } from '../../models/Usuario';
import { CreateUsuarioDto } from './usuario.types';

const index = async (req: Request, res: Response) => {
    try{
        const usuarios = await listUsuarios() // recupera os usuarios
        res.status(200).json(usuarios) // retorna a lista
    } catch (e) {
        res.status(500).json(e)
    }
}

const create = async (req: Request, res: Response) => {
    const user = req.body as CreateUsuarioDto; 
    try{
        if (await buscaUsuarioPorEmail(user.email))
            return res.status(400).json({ message: 'Usuário já existe' });        
        const newUser = await createUsuario(req.body)
        res.status(200).json(newUser)
    } catch (e) {
        res.status(500).json(e)
    }
}

const read = async (req: Request, res: Response) => {
    const { id } = req.params
    try { 
        const user = await readUsuario(id)
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
}


const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = req.body
    try {
        const result = await updateUser(id, user)
        if (result === null) return res.status(400).json({ msg: "Usuaário naõ existe" })
        else res.status(200).json({ msg: "Dados foram atualizados" })
    } catch (e) {
        return res.status(500).json(e)
    }
}

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await readUsuario(id);
      console.log(user);
      if (!user) return res.status(400).json({ message: 'Usuário não existe' });
      await deleteUser(id);
      res.status(200).json({ message: 'Usuário excluido' });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
};

export default { index, create, read, update, remove }