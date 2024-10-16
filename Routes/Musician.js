const express = require(`express`);
const { Musician } = require("../models/index")
const musicianRouter = express.Router();

musicianRouter.get(`/`, async (req, res) => {
    const musicians = await Musician.findAll({});
    res.json(musicians);
})

musicianRouter.get('/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

musicianRouter.post(`/`, async (req, res) => {
        await Musician.create(req.body);
        res.send(`New Musician created`);
});

musicianRouter.put(`/:id`, async (req, res) => {
        await Musician.update(req.body, {where: {id: req.params.id}});
        res.send(`Musician${req.params.id} updated`);
});

musicianRouter.delete(`/:id`, async (req, res) => {
        await Musician.destroy({where: {id: req.params.id}});
        res.send(`Musician${req.params.id} deleted`);
});

module.exports = { musicianRouter };