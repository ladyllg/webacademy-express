import { Prof } from './helpersTypes';

export function listaProfs(profs: Prof[]) {
  console.log(profs);
  const lista = profs.map((p) => `<li>${p.nome} ${p.sala}</li>`).join('\n');
  return `<ul>${lista}</ul>`;
}

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
