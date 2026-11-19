require('dotenv').config();
const express = require('express');
const AppError = require('./utils/AppError');

if (!process.env.JWT_SECRET) {
  console.error('Defina JWT_SECRET no arquivo .env (copie o .env.example)');
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Adoção de Pets funcionando' });
});

app.use('/auth', require('./routes/auth'));
app.use('/animais', require('./routes/animais'));
app.use('/pedidos', require('./routes/pedidos'));

// rota inexistente
app.use((req, res, next) => next(new AppError(404, 'Rota não encontrada')));

// middleware de erro (sempre o último): formato { "erro": "mensagem" }
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido' });
  }
  if (err instanceof AppError) {
    return res.status(err.status).json({ erro: err.message });
  }
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));