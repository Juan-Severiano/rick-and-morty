const { async } = require('regenerator-runtime');
const plumbus = require('rickmortyapi');

exports.home = async (req, res) => {
    try {
        const rick = await plumbus.getCharacters()
        const r = rick.data.results
        
        for (const character of r) {
            const firstEpisodeName = await getFirstEpisodeName(character.name);
            character.firstEpisodeName = firstEpisodeName;
        }
        
        res.render('index', { r, getFirstEpisodeName })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).render('errorAPI');
    }
}

exports.search = async (req, res) => {
    await res.send('agr fudeo');
}

async function getFirstEpisodeName(characterName) {
    try {
        // Obtém todos os personagens
        const response = await plumbus.getCharacters();
        const characters = response.data.results;

        // Procura o personagem pelo nome na lista de resultados
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