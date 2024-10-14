const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

// Code for Express Musicians Part 1

app.get(`/musicians`, async (req, res) => {
    const musicians = await Musician.findAll({});
    res.json(musicians);
})

// Codde for Express Musicians Part 1 extension

app.get(`/musicians/1`, async (req, res) => {
    const musician1 = await Musician.findByPk(1);
    res.json(musician1);
})

app.get(`/bands`, async (req, res) => {
    const bands = await Band.findAll({});
    res.json(bands);
})

module.exports = app;