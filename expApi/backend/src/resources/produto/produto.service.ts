import { Produto } from '../../models/Produto';
import { CreateProdutoDto, UpdateProdutoDto } from './produto.types';

const getAllProdutos = async (): Promise<Produto[]> => {
    const produtos = await Produto.findAll();
    return produtos.map((p) => p.toJSON());
};
const createProduto = async (produto: CreateProdutoDto): Promise<Produto> => {
    return await Produto.create(produto);
};
const getProduto = async (id: string): Promise<Produto | null> => {
    return await Produto.findOne({ where: { id } })
}
const updateProduto = async (id: string, produto: UpdateProdutoDto): Promise<number | null> => {
    const prod = await getProduto(id);
    if (prod === null) return null
    const [affectedCount] = await Produto.update(produto, { where: { id } })
    return affectedCount;
}

export { getAllProdutos, createProduto, getProduto, updateProduto };

export const buscaProdutoPorNome = async (
    nome: string,
): Promise<Produto | null> => {
    return await Produto.findOne({ where: { nome } });
};

  
export const deleteProduto = async (id: string): Promise<number> => {
    return await Produto.destroy({ where: { id } });
};