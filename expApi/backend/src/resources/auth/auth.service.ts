import { Usuario } from "../../models/Usuario";
import { LoginDto } from "./auth.types";
import bcrypt from 'bcryptjs';


export const checkCredentials = async (credenciais: LoginDto): Promise<Usuario | null> => {
    const { email, senha } = credenciais;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return null;
    const ok = await bcrypt.compare(senha, usuario.senha);
    if(ok) return usuario
    return null
}