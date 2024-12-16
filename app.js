import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2';
import routes from './src/routes/routes.js';

// Carregando variáveis de ambiente
dotenv.config();

// Log para verificar se as variáveis de ambiente foram carregadas
console.log('Variáveis de ambiente:');
console.log('DATABASE_USER:', process.env.DATABASE_USER);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD ? '******' : 'Não definida'); // Não exibir a senha real
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

const app = express();

// Configurações do Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectando ao banco de dados MySQL
console.log('Tentando conectar ao banco de dados...');
const connection = mysql.createConnection({
host: 'autorack.proxy.rlwy.net',
user: process.env.DATABASE_USER,
password: process.env.DATABASE_PASSWORD,
database: process.env.MYSQL_DATABASE,
port: 30437,
});

// Testando a conexão com o banco de dados
connection.connect((err) => {
if (err) {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1); // Encerrar a aplicação caso não consiga conectar ao banco
} else {
  console.log('Conectado ao banco de dados');
}
});

// Definindo rotas
app.use('/api', routes);

// Rota para consultar tarefas
app.get('/api/tarefa', (req, res) => {
console.log('Consultando tarefas no banco de dados...');
connection.query('SELECT * FROM tarefas', (err, results) => {
  if (err) {
    console.error('Erro ao consultar tarefas:', err);
    res.status(500).json({ message: 'Erro ao consultar tarefas.' });
  } else {
    console.log('Consulta realizada com sucesso:', results);
    res.status(200).json(results);
  }
});
});

// Tratamento de erro
app.use((err, req, res, next) => {
console.error('Erro interno:', err.stack);
res.status(500).send('Algo deu errado!');
});

export default app;