const plumbus = require('rickmortyapi');

exports.home = async (req, res) => {
    try {
        const c = await plumbus.getCharacters();
        res.render('index', {c});
    } catch (error) {
        console.log(error);
        res.status(500).render('errorAPI');
    }
}
