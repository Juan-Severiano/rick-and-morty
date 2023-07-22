const { async } = require('regenerator-runtime');
const plumbus = require('rickmortyapi');
const fetch = require('node-fetch');

exports.home = async (req, res) => {
    try {
        const charactersAll = await plumbus.getCharacters()
        const characters = charactersAll.data.results
        
        for (const c of characters) {
            const firstEpisodeName = await getFirstEpisodeName(c.name);
            c.firstEpisodeName = firstEpisodeName;
        }
        
        res.render('index', { characters })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).render('errorAPI');
    }
}

exports.search = async (req, res) => {
    await res.send('agr fudeo');
}

const getFirstEpisodeName = async (characterName) => {
    try {
        const response = await plumbus.getCharacters();
        const characters = response.data.results;

        const character = characters.find((char) => char.name.toLowerCase() === characterName.toLowerCase());

        if (!character) {
            console.log(`O personagem "${characterName}" não foi encontrado.`);
            return;
        }
        const firstEpisodeId = character.episode[0].split('/').pop();

        const episodeResponse = await plumbus.getEpisode(parseInt(firstEpisodeId));
        const firstEpisodeName = episodeResponse.data.name;

        return String(firstEpisodeName)
    } catch (error) {
        console.error('Ocorreu um erro ao obter informações do personagem:', error.message);
    }
}