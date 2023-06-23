import { Departamentos } from "../models/Departamentos";

interface DepartamentosDTO {
    id: string;
    name: string;
    sigla: string;
    createdAt: Date;
    updatedAt: Date;
}

export { DepartamentosDTO };

