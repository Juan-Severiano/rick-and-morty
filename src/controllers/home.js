const { async } = require('regenerator-runtime');
const plumbus = require('rickmortyapi');

exports.home = async (req, res) => {
    try {
        const rick = await plumbus.getCharacters()
        const r = rick.data.results
        
        res.render('index', { r });
    } catch (error) {
        console.log(error);
        res.status(500).render('errorAPI');
    }
}

exports.search = async (req, res) => {
    await res.send('agr fudeo');
}


// async function asd() {
//     const rick = await plumbus.getCharacters()
//     console.log(rick.data.results)
// }

// asd()