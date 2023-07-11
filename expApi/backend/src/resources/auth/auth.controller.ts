import { Request, Response } from 'express';
import { TiposUsuarios } from '../tipoUsuario/tipoUsuario.types';
import { buscaUsuarioPorEmail, createUsuario } from '../usuario/usuario.service';
import { checkCredentials } from './auth.service';

const signup = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body
    try {
        if (await buscaUsuarioPorEmail(email))
            return res.status(400).json({ msg: 'Email informado já está sendo usado' });
        const newUsuario = await createUsuario({ nome, email, senha, tipoUsuarioId: TiposUsuarios.CLIENT });
        res.status(201).json(newUsuario);
    } catch (e: any) {
        res.status(500).json(e.errors);
    }
};

const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
        const usuario = await checkCredentials({ email, senha });
        if (!usuario)
            return res.status(401).json({
                msg: 'Email e/ou senha incorretos'
            });
        req.session.uid = usuario.id;
        req.session.tipoUsuarioId = usuario.tipoUsuarioId;
        res.status(200).json({
            msg: 'Usuário autenticado com sucesso'
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

const logout = (req: Request, res: Response) => {
    if (req.session.uid) {
        req.session.destroy((err) => {
            if (err) res.status(500).json(err)
            else res.status(200).json({ msg: "Você deslogou da sua conta!"})
        })
    }else{
        res.status(400).json({ msg: 'O usuario nao está logado !'})
    }
}

export default { login, logout, signup }
