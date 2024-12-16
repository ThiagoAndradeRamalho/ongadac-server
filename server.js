import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const mongoose = require('mongoose');

const DATABASE_URL = "mysql://root:eNKkOLZkEHfQVVtZNnDezPAPnkAbHwPM@autorack.proxy.rlwy.net:30437/railway";

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Erro ao conectar no banco de dados:", error.message);
  });

  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("Banco de dados conectado com sucesso"))
    .catch(error => {
      console.error("Erro ao conectar no banco de dados:", error.message);
      process.exit(1); // Encerra o processo caso não consiga conectar
    });
