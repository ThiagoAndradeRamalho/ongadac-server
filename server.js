import 'dotenv/config';
import mysql from 'mysql2';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



const connection = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 30437
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // Encerra o servidor em caso de erro na conexão
  } else {
    console.log('Conexão com o MySQL realizada com sucesso!');
  }
});
