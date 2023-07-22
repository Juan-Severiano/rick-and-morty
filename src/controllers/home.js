const axios = require('axios');
const plumbus = require('rickmortyapi');
const { async } = require('regenerator-runtime');

exports.home = async (req, res) => {
    try {
        const charactersAll = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = charactersAll.data.results;

        for (const c of characters) {
            const firstEpisodeName = await getFirstEpisodeName(c.name);
            c.firstEpisodeName = firstEpisodeName;
        }

        res.render('index', { characters });
    } catch (error) {
        console.log(error);
        res.status(500).render('errorAPI');
    }
}

const getFirstEpisodeName = async (characterName) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = response.data.results;

        const character = characters.find((char) => char.name.toLowerCase() === characterName.toLowerCase());

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
}

exports.search = async (req, res) => {
    await res.send('agora foi');
}