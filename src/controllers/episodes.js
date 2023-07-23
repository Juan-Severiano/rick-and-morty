const axios = require('axios');

exports.episodeController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
    const episodes = response.data.results;

    res.render('episodeList', { episodes, page });
  } catch (error) {
    console.log(error);
    res.status(500).render('errorAPI');
  }
}