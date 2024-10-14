// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    // Test written for Express Musicians Part 1

    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/musicians`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const musician = await Musician.findByPk(1);
        const responseData = JSON.parse(response.text);
        expect(musician.dataValues.name).toEqual(responseData[0].name) // compares the data from the response to the database
    });
    
})
