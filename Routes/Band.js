const express = require(`express`);
const { Band, Musician } = require("../models/index")
const bandRouter = express.Router();

bandRouter.get(`/`, async (req, res) => {
    const bands = await Band.findAll(); // creates an array containing the band objects and saves it to the bands variable
    // Use of Promise.all() to encapsulate the function waits for the collection of all promises before returning the result
    // .map() loops through the array and performs the same function on each member of the array and returns an updated array
    const bandsWithMembers = await Promise.all(bands.map(async (band) => {
        const musicians = await band.getMusicians(); // get all musicians from each band in the loop in the form of an array
        return { // encapsulates the updated information within a new object
            ...band.toJSON(), // spreads the band object and converst it to JSON format
            musicians // adds the musician array to the object
            };
        }));
        res.json(bandsWithMembers);
})

bandRouter.get('/:id', async (req, res) => {
    const band = await Band.findByPk(req.params.id);
    const bandMembers = await band.getMusicians();
    const bandWithMembers = {
        ...band.toJSON(),
        bandMembers
        };
    res.json(bandWithMembers);
});

module.exports = {
    bandRouter,
}