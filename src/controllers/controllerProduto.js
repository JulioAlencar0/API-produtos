const pool = require("../config/db.js");

const getProdutos = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const resultado = await pool.query(
        "SELECT * FROM tb_produtos WHERE id = $1",
        [id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ error: "Produto não foi encontrado" });
      }

      return res.status(200).json(resultado.rows[0]);
    } else {
      const resultado = await pool.query("SELECT * FROM tb_produtos");
      return res.status(200).json(resultado.rows);
    }
  } catch (err) {
    console.error("Erro ao buscar os produtos", err);
    return res.status(500).json({ error: "Erro ao buscar os produtos" });
  }
};

const createProdutos = async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const novoProduto = await pool.query(
      "INSERT INTO tb_produtos ( nome, descricao, preco, quantidade) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, descricao, preco, quantidade]
    );
    res.status(200).json(novoProduto.rows[0]);
  } catch (err) {
    console.error("Erro ao criar o produto");
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
};

const updateProdutos = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const atualizarProduto = await pool.query(
      "UPDATE tb_produtos SET nome = $1, descricao = $2, preco = $3, quantidade = $4 WHERE id = $5 RETURNING *",
      [nome, descricao, preco, quantidade, id]
    );

    if (atualizarProduto.rows.length === 0) {
      res.status(404).json({ error: "Id não encontrado" });
    }
    res.status(200).json(atualizarProduto.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar produtos", err);
    res.status(500).json({ error: "Erro ao atualizar os produtos" });
  }
};

const patchProduto = async (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    try {
        // Primeiro, busca o produto atual
        const produtoAtual = await pool.query(
            'SELECT quantidade FROM tb_produtos WHERE id = $1',
            [id]
        );

        if (produtoAtual.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const quantidadeAtual = produtoAtual.rows[0].quantidade;
        const novaQuantidade = quantidadeAtual + quantidade;

        // Impede que a quantidade fique negativa no banco
        if (novaQuantidade < 0) {
            return res.status(400).json({ error: 'Quantidade final não pode ser negativa' });
        }

        // Atualiza a quantidade
        const result = await pool.query(
            'UPDATE tb_produtos SET quantidade = $1 WHERE id = $2 RETURNING *',
            [novaQuantidade, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar a quantidade do produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar a quantidade do produto' });
    }
};

const deleteProdutos = async (req, res) => {
  const { id } = req.params;
  try {
    const apagarProdutos = await pool.query(
      "DELETE FROM tb_produtos WHERE id = $1 RETURNING *",[id]
    );
    if (apagarProdutos.rows.length === 0) {
      res.status(404).json({ error: "Id não encontrado" });
    }
    res.status(200).json({ message: "Id excluido com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir produto", err);
    res.status(500).json({ error: "Erro ao excluir o produto" });
  }
};

module.exports = {
  getProdutos,
  createProdutos,
  updateProdutos,
  patchProduto,
  deleteProdutos
};
