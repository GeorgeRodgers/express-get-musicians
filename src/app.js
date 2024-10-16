const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")
const { musicianRouter } = require(`../Routes/Musician.js`)
const { bandRouter } = require(`../Routes/Band.js`)

//TODO: Create a GET /musicians route to return all musicians 

// Code for Express Musicians Part 1

// app.get(`/musicians`, async (req, res) => {
//     const musicians = await Musician.findAll({});
//     res.json(musicians);
// })

// // Code for Express Musicians Part 1 extension

// app.get(`/musicians/1`, async (req, res) => {
//     const musician1 = await Musician.findByPk(1);
//     res.json(musician1);
// })  // Express Musicians Part 2 recreates this GET

// app.get(`/bands`, async (req, res) => {  // route removed for Express Musicians Bonus
//     const bands = await Band.findAll({});
//     res.json(bands);
// });

// // Code for Express Musicians Part 2

// app.get('/musicians/:id', async (req, res) => {
//     const musician = await Musician.findByPk(req.params.id);
//     res.json(musician);
// });

// // Code for Express Musicians Part 3

// app.use(express.json());
// app.use(express.urlencoded());

// app.post(`/musicians`, async (req, res) => {
//         await Musician.create(req.body);
//         res.send(`New Musician created`);
// });

// app.put(`/musicians/:id`, async (req, res) => {
//         await Musician.update(req.body, {where: {id: req.params.id}});
//         res.send(`Musician${req.params.id} updated`);
// });

// app.delete(`/musicians/:id`, async (req, res) => {
//         await Musician.destroy({where: {id: req.params.id}});
//         res.send(`Musician${req.params.id} deleted`);
// });

// All routes removed in this section for Express Musicians Part 4

// // Code for Express Musicians Part 4

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/musicians`, musicianRouter);
app.use(`/bands`, bandRouter);

module.exports = app;