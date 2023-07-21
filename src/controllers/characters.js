const { async } = require('regenerator-runtime');
const home = require('./home')
const getFirstEpisodeName = home.getFirstEpisodeName
const plumbus = require('rickmortyapi');

exports.characters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const charactersAll = await plumbus.getCharacters({ page });
    const characters = charactersAll.data.results;

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

    const episodeResponse = await plumbus.getEpisode(parseInt(firstEpisodeId));
    const firstEpisodeName = episodeResponse.data.name;

    return String(firstEpisodeName);
  } catch (error) {
    console.error('Ocorreu um erro ao obter informações do personagem:', error.message);
  }
}