const express = require(`express`);
const { check, validationResult } = require(`express-validator`)
const { Musician } = require("../models/index")
const musicianRouter = express.Router();

musicianRouter.get(`/`, async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
})

musicianRouter.get('/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

musicianRouter.post(`/`, [
    check("name").not().isEmpty().trim(), // Updated for Exress Musicians Part 5
    check("instrument").not().isEmpty().trim(),
    check("name").isLength({min: 2, max: 20}), // Updated for Extension problems
    check("instrument").isLength({min: 2, max: 20})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.json({error: errors.array()});
    } else {
    const newMusician = await Musician.create(req.body);
    res.json(newMusician);
    };
});

musicianRouter.put(`/:id`, [
    check("name").isLength({min: 2, max: 20}), // Updated for Extension problems
    check("instrument").isLength({min: 2, max: 20})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.json({error: errors.array()});
    } else {
    await Musician.update(req.body, {where: {id: req.params.id}});
    const updatedMusician = await Musician.findByPk(req.params.id);
    res.send(updatedMusician);
    };
});

musicianRouter.delete(`/:id`, async (req, res) => {
        await Musician.destroy({where: {id: req.params.id}});
        res.send(`Musician${req.params.id} deleted`);
});

module.exports = { musicianRouter };