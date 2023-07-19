const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.get('/characters', async (req, res) => {
  try {
    const characters = await getCharacter();
    res.send(characters.results);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao obter os personagens de Rick and Morty.');
  }
});

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
});