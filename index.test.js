// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");

// Test written for Express Musicians Part 1

describe('./musicians endpoint', () => {
    test(`gets the correct response`, async () => {
        let response = await request(app).get(`/musicians`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        let musician = await Musician.findByPk(1);
        let responseData = JSON.parse(response.text);
        expect(musician.dataValues.name).toEqual(responseData[0].name) // compares the data from the response to the database
    });
});

// need to write tests for Musicians Part 2

describe('./musicians/:id endpoint', () => {
    test(`gets the correct response`, async () => {
        response = await request(app).get(`/musicians/2`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        musician = await Musician.findByPk(2);
        responseData = JSON.parse(response.text);
        expect(musician.name).toEqual(responseData.name);
    });
});