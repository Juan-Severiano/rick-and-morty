const plumbus = require('rickmortyapi');

exports.locationController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const locationsAll = await plumbus.getLocations({ page })
    const locations = locationsAll.data.results

    res.render('locationList', { locations, page });
  } catch (error) {
    console.log(error)
    res.status(500).render('errorAPI');
  }
}