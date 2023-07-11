import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.types";
export interface SeedsDB {
  inserts?: Array<{ model: string; query: string }>;
}

const seeds: Map<number, SeedsDB> = new Map<number, SeedsDB>();

seeds.set(1, {
  inserts: [
    {
      model: 'TipoUsuario',
      query: `INSERT INTO TipoUsuarios (id, rotulo, createdAt, updatedAt) values (${TiposUsuarios.CLIENT}, 'cliente', now(), now());`,
    },
    {
      model: 'TipoUsuario',
      query: `INSERT INTO TipoUsuarios (id, rotulo, createdAt, updatedAt) values (${TiposUsuarios.ADMIN}, 'admin', now(), now());`,
    },
  ],
});

export { seeds };
