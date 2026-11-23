# API de Adoção de Pets

Usuários cadastram animais para adoção. Qualquer pessoa vê os animais; só quem cadastrou altera ou remove. Usuários logados fazem pedidos de adoção, e só o dono do animal decide sobre eles. Ao aprovar um pedido, o animal passa a adotado.

**Tecnologias:** Node.js, Express, SQLite (better-sqlite3), JWT e bcrypt.

## Como rodar

```
npm install
cp .env.example .env
npm run dev
```

O servidor sobe em `http://localhost:3000`. O banco (`adocao.db`) é criado sozinho na primeira execução.

## Estrutura (código em camadas)

```
src/
  routes/        define os caminhos e o nível de acesso de cada rota
  middlewares/   autenticar (token) e verificarDonoAnimal (dono)
  controllers/   lê a requisição e devolve a resposta
  services/      regras de negócio e validações
  models/        acesso ao banco de dados
  utils/         AppError e asyncHandler
  database.js    conexão e criação das tabelas
  app.js         configuração do Express e tratamento de erros
```

## Níveis de acesso

- **Aberto:** qualquer pessoa, sem token.
- **Logado:** qualquer usuário com token (`Authorization: Bearer <token>`).
- **Dono:** só quem criou aquele registro.

## Rotas

| Verbo | Rota | Acesso | Sucesso | Erros |
|---|---|---|---|---|
| POST | /auth/cadastro | aberto | 201 | 400 |
| POST | /auth/login | aberto | 200 + token | 401 |
| GET | /auth/perfil | logado | 200 | 401 |
| GET | /animais | aberto | 200 | — |
| GET | /animais/:id | aberto | 200 | 404 |
| POST | /animais | logado | 201 | 400, 401 |
| PUT | /animais/:id | dono do animal | 200 | 400, 401, 403, 404 |
| DELETE | /animais/:id | dono do animal | 204 | 401, 403, 404 |
| POST | /animais/:id/pedidos | logado | 201 | 400, 401, 404 |
| GET | /animais/:id/pedidos | dono do animal | 200 | 401, 403, 404 |
| GET | /pedidos | logado (só os meus) | 200 | 401 |
| DELETE | /pedidos/:id | dono do pedido | 204 | 401, 403, 404 |
| PUT | /pedidos/:id/status | dono do animal | 200 | 400, 401, 403, 404 |

Exemplos de requisição e resposta de cada rota estão no `contrato.json`.

## Regras de negócio

- Ninguém pede a adoção do próprio animal.
- Não se pede um animal já adotado.
- Não se repete o pedido do mesmo usuário para o mesmo animal.
- Aprovar um pedido marca o animal como `adotado`.
- O dono do registro vem sempre do token, nunca do corpo da requisição.
- A senha é salva como hash e nunca volta nas respostas.

## Como testar

- `testes.http`: requisições prontas para a extensão REST Client do VS Code.
- `http://localhost:3000/demo.html`: painel que roda todas as rotas e mostra o resultado.
- `http://localhost:3000/app.html`: interface para usar a API pelo navegador.

## Erros

Todos os erros seguem o formato `{ "erro": "mensagem" }`.