import { Request, Response } from 'express';
import { Departamentos } from '../models/Departamentos';
import { DepartamentosDTO } from '../dto/DepartamentosDTO';
import { v4 as uuidv4 } from 'uuid';

async function index(req: Request, res: Response) {
    const departamentos = await Departamentos.findAll()
    res.render('dept/index', { departamentos: departamentos.map((d) => d.toJSON()) })
};
async function read(req: Request, res: Response) {
    if (req.route.methods.get) {
        res.render('dept/create')
    }
};
async function create(req: Request, res: Response) {
    if (req.route.methods.get) {
        res.render('dept/create');
    } else {
        const dept: DepartamentosDTO = {
            id: uuidv4(),
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        try {
            await Departamentos.create({ ...dept });
            res.redirect('/dept');
        } catch (e: any) {
            console.log(e.errors);
            res.render('dept/create', { dept, errors: e.errors });
        }
    }
};
async function update(req: Request, res: Response) {
    const { id } = req.params;
    const dept = await Departamentos.findByPk(id)
    if (req.route.methods.get) {        
        res.render('dept/update', { dept: {name:dept?.name, sigla:dept?.sigla, id:dept?.id} });
    }else{
        console.log("editando um departamento")
        try {
            const updatedDept = {
                name:req.body.name,
                sigla: req.body.sigla,
                updatedAt: new Date(),
            };
            await Departamentos.update({ ...updatedDept }, { where: { id: id }});
            res.redirect('/dept');
        } catch (e: any) {
            console.log(e.errors);
            res.render('dept/create', { dept, errors: e.errors });
        }
    }
};

async function del(req: Request, res: Response) {
    const { id } = req.params;
    const dept = await Departamentos.findByPk(id)
    if (req.route.methods.get) {        
        res.render('dept/delete', { dept: {name:dept?.name, sigla:dept?.sigla, id:dept?.id} });
    }else{
        await Departamentos.destroy({ where: { id: id }})
        res.redirect('/dept');
    }
};

export default { index, read, create, update, del }

export function showError(errors: any[], field: string) {
    let mensagem = '';
    if (errors) {
        errors.forEach((e) => {
            if (e.path === field) {
                mensagem += e.message;
            }
        });
    }
    return mensagem;
}
