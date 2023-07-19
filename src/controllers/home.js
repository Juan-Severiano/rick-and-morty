const { async } = require('regenerator-runtime');
const plumbus = require('rickmortyapi');

exports.home = async (req, res) => {
    try {
        const rick = await plumbus.getCharacter(1)
        // const c = await plumbus.getCharacters();
        // const characters = await c.results[0]
        const r = rick.data
        res.render('index', { r });
    } catch (error) {
        console.log(error);
        res.status(500).render('errorAPI');
    }
}

exports.search = async (req, res) => {
    await res.send('agr fudeo');
}


async function asd() {
    const rick = await plumbus.getCharacter(1)
    console.log(rick.data.name)
}

asd()