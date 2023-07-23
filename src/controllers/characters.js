const { async } = require('regenerator-runtime');
const axios = require('axios');

exports.characters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    const characters = response.data.results;

    for (const c of characters) {
      const firstEpisodeName = await getFirstEpisodeName2(c.name, characters);
      c.firstEpisodeName = firstEpisodeName;
    }

    res.render('charactersList', { characters, page });
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    res.status(500).render('errorAPI');
  }
};

const getFirstEpisodeName2 = async (characterName, charactersList) => {
  try {
    const character = charactersList.find((char) => char.name.toLowerCase() === characterName.toLowerCase());

    if (!character) {
      console.log(`O personagem "${characterName}" não foi encontrado.`);
      return;
    }
    const firstEpisodeId = character.episode[0].split('/').pop();

    const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${firstEpisodeId}`);
    const firstEpisodeName = episodeResponse.data.name;

    return String(firstEpisodeName);
  } catch (error) {
    console.error('Ocorreu um erro ao obter informações do personagem:', error.message);
  }
};