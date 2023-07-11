import { Request, Response } from 'express';
import { buscaProdutoPorNome, createProduto, deleteProduto, getAllProdutos, getProduto, updateProduto } from './produto.service';
import { Produto } from '../../models/Produto';
import { CreateProdutoDto } from './produto.types';

const index = async (req: Request, res: Response) => {
    try {
        const produtos = await getAllProdutos()
        res.status(200).json(produtos)
    } catch (e) {
        res.status(500).json(e)
    }
}

const create = async (req: Request, res: Response) => {
    const produto = req.body as CreateProdutoDto;
    try {
        if (await buscaProdutoPorNome(produto.nome))
            return res.status(400).json({ message: 'Produto já existe' });
        const newProduto = await createProduto(produto);
        res.status(201).json(newProduto);
    } catch (e) {
        res.status(500).json(e);
    }
}

const read = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const produto = await getProduto(id)
        if (produto === null) return res.status(400).json({ msg: 'Produto não existe' })
        else res.status(201).json(produto)
    } catch (e) {

    }
}

const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const produto = req.body
    try {
        const result = await updateProduto(id, produto)
        if (result === null) return res.status(400).json({ msg: "Produto naõ existe" })
        else res.status(200).json({ msg: "Produto atualizado" })
    } catch (e) {
        return res.status(500).json(e)
    }
}

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const prod = await getProduto(id);
      console.log(prod);
      if (!prod) return res.status(400).json({ message: 'Produto não existe' });
      await deleteProduto(id);
      res.status(200).json({ message: 'Produto apagado' });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
};

export default { index, create, read, update, remove }