// install dependencies
const { execSync } = require('child_process');
// execSync('npm install'); // slows down test and is not required
// execSync('npm run seed');
execSync('node seed'); // Using this code stops the issue with permissions error

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app')
const { seedMusician, seedBand } = require("./seedData");
const { clear } = require('console');

// beforeAll(async () => {
//     await db.sync({ force: true });
//     execSync('node seed');
//   })


// Test written for Express Musicians Part 1

describe('./musicians GET request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/musicians`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toEqual(seedMusician[0].name);
        expect(responseData[0].instrument).toEqual(seedMusician[0].instrument); // compares the data from the response to the seedData
    });
});

// Test written for Express Musicians Part 2

describe('./musicians/:id GET request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/musicians/2`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual(seedMusician[1].name);
        expect(responseData.instrument).toEqual(seedMusician[1].instrument); // compares the data from the response to the seedData
    });
});

// Test written for Express Musicians Part 3

describe('./musicians POST request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).post(`/musicians`).send({name: "testName", instrument: "testInstrument"});
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = JSON.parse(response.text);
        expect(responseData.id).toEqual(4);
        expect(responseData.name).toEqual("testName");
        expect(responseData.instrument).toEqual("testInstrument");
    });
});

describe('./musicians PUT request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).put(`/musicians/4`).send({name: "updatedName", instrument: "updatedInstrument"});
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual("updatedName");
        expect(responseData.instrument).toEqual("updatedInstrument");
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

// Test written for Express Musicians Bonus

describe('./bands GET request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/bands`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toEqual(seedBand[0].name);
        expect(responseData[0].genre).toEqual(seedBand[0].genre); // compares the data from the response to the seedData
        expect(Array.isArray(responseData[0].musicians)).toEqual(true);
    });
});

describe('./bands/:id GET request', () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/bands/2`);
        expect(response.statusCode).toBe(200); // Check status code for the response
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual(seedBand[1].name);
        expect(responseData.genre).toEqual(seedBand[1].genre); // compares the data from the response to the seedData
        expect(Array.isArray(responseData.musicians)).toEqual(true);
    });
});