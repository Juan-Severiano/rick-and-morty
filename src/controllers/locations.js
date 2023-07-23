const axios = require('axios');
const plumbus = require('rickmortyapi');

exports.locationController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
    const locations = response.data.results;

    res.render('locationList', { locations, page });
  } catch (error) {
    console.log(error);
    res.status(500).render('errorAPI');
  }
}