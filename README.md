
# 🛍️ API de Produtos

API REST construída com **Node.js**, **Express** e **PostgreSQL** para gerenciamento de produtos. Permite cadastrar, consultar, editar, remover e ajustar o estoque de produtos.

---

## 🚀 Tecnologias Usadas

- Node.js
- Express
- PostgreSQL (via pg)
- Nodemon (para desenvolvimento)

---

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── db.js                 # Conexão com o PostgreSQL
├── controllers/
│   └── controllerProduto.js  # Lógica de manipulação dos produtos
├── routes/
│   └── routesProdutos.js     # Rotas da API de produtos
├── app.js                    # Configuração do Express
server.js                     # Inicialização do servidor
package.json                  # Dependências e scripts
```

---

## ⚙️ Instalação

1. Clone o projeto:

```bash
git clone https://github.com/seu-usuario/api-produtos.git
cd api-produtos
```

2. Instale as dependências:

```bash
npm install
```

3. Configure seu banco PostgreSQL:

Crie um banco chamado `produtos` e execute o SQL abaixo:

```sql
CREATE TABLE tb_produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  preco NUMERIC(10, 2),
  quantidade INTEGER DEFAULT 0
);
```

4. Atualize suas credenciais em `db.js`:

```js
const pool = new Pool({
    user: 'nome de usuario',
    host: 'localhost',
    database: 'nome do seu banco',
    password: 'sua senha',
    port: 5432,
});
```

> 💡 Dica: use variáveis de ambiente para esconder senhas no futuro.

5. Inicie o servidor:

```bash
npm start
```

Servidor rodando em: `http://localhost:3000`

---

## 📮 Endpoints da API

Base URL: `/produtos`

### 🔹 Criar produto

- **POST** `/produtos`
- **Body**:

```json
{
  "nome": "Notebook",
  "descricao": "Notebook Gamer",
  "preco": 3500.00,
  "quantidade": 10
}
```

---

### 🔹 Listar todos os produtos

- **GET** `/produtos`

### 🔹 Buscar produto por ID

- **GET** `/produtos/:id`

---

### 🔹 Atualizar produto (PUT)

- **PUT** `/produtos/:id`
- Substitui todos os dados do produto.

---

### 🔹 Atualizar apenas o estoque (PATCH)

- **PATCH** `/produtos/:id/estoque`
- **Body:**

```json
{ "quantidade": -3 } // Vender 3 unidades
{ "quantidade": 5 }  // Adicionar 5 unidades ao estoque
```

---

### 🔹 Deletar produto

- **DELETE** `/produtos/:id`

---

## 📦 Scripts

- `npm start`: inicia o servidor com Nodemon.

---

## 👨‍💻 Autor

Projeto criado por **Júlio Alencar** — estudante de ADS e futuro dev referência 🚀

---

## 📝 Licença

Uso livre para fins educacionais e pessoais.
