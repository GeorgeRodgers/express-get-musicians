// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app')
const {seedMusician} = require("./seedData");

// Test written for Express Musicians Part 1

describe('./musicians endpoint', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/musicians`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const musician = await Musician.findByPk(1);
        const responseData = JSON.parse(response.text);
        expect(musician.dataValues.name).toEqual(responseData[0].name) // compares the data from the response to the database
    });
});

// Test written for Express Musicians Part 2

describe('./musicians/:id GET request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/musicians/2`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        musician = await Musician.findByPk(2);
        const responseData = JSON.parse(response.text);
        expect(musician.name).toEqual(responseData.name);
    });
});

// Test written for Express Musicians Part 3

describe('./musicians POST request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).post(`/musicians`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = response.text;
        expect(responseData).toEqual(`New Musician created`);
    });
});

describe('./musicians PUT request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).put(`/musicians/4`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = response.text;
        expect(responseData).toEqual(`Musician4 updated`);
    });
});

describe('./musicians DELETE request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).delete(`/musicians/4`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = response.text;
        expect(responseData).toEqual(`Musician4 deleted`);
    });
});