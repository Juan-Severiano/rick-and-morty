const plumbus = require('rickmortyapi');
const fetch = require('node-fetch');

exports.episodeController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const episodesAll = await plumbus.getEpisodes({ page })
    const episodes = episodesAll.data.results

    res.render('episodeList', { episodes, page });
  } catch (error) {
    console.log(error)
    res.status(500).render('errorAPI');
  }
}