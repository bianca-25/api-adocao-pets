# API de Adoção de Pets

Usuários cadastram animais para adoção. Qualquer pessoa vê os animais; só quem cadastrou altera ou remove. Usuários logados fazem pedidos de adoção, e só o dono do animal decide sobre eles. Ao aprovar um pedido, o animal passa a adotado.

Tecnologias: Node.js, Express, SQLite (better-sqlite3), JWT e bcrypt.

## Como rodar

```
npm install
cp .env.example .env
npm run dev
```

Servidor em http://localhost:3000. Os exemplos de cada rota estão no contrato.json.