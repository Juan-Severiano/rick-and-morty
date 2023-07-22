const plumbus = require('rickmortyapi');

exports.locationController = async () => {
  try {
    const locations = await getLocations()
  } catch (error) {
    console.log(error)
  }
}