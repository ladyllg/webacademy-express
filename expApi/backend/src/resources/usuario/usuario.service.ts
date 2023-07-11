import exp from "constants";
import { Usuario } from "../../models/Usuario";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.types";
import bcrypt from 'bcryptjs';

export const listUsuarios = async(): Promise<Usuario[]> => {
    const usuarios = await Usuario.findAll()
    return usuarios.map(p=>p.toJSON())
} 

export const buscaUsuarioPorEmail = async ( email:string): Promise<Usuario | null > => {
    return await Usuario.findOne({attributes:['id', 'tipoUsuarioId', 'nome', 'email', 'createdAt', 'updatedAt'], where: { email } })
}

export const createUsuario = async (user:CreateUsuarioDto): Promise<Usuario> => {
    // processo de criptografar
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNS!, 10))
    const hash = await bcrypt.hash(user.senha, salt)
    
    const newUser = await Usuario.create({ ... user, senha: hash})
    const newUserNoPassword = newUser.toJSON()
    delete newUserNoPassword['senha']
    return newUserNoPassword
}

export const readUsuario = async (id:string): Promise<Usuario | null> => {
    const user = await Usuario.findOne({ where: { id } })
    return user ? user.toJSON() : null
}

export const updateUser = async (id: string, user: UpdateUsuarioDto): Promise<number | null> => {
    const usuario = await readUsuario(id);
    if (usuario === null) return null
    // processo de criptografar
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNS!, 10))
    const hash = await bcrypt.hash(user.senha, salt)

    const [affectedCount] = await Usuario.update({ ...user, senha: hash}, { where: { id } } )
    return affectedCount;
}

export const deleteUser = async (id: string): Promise<number> => {
    return await Usuario.destroy({ where: { id } });
};

