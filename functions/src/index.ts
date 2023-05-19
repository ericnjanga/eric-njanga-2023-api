import * as functions from 'firebase-functions';
import * as express from 'express';

// const PORT = 3000;
// const { getProjects } = require('./routes/getProjects'); 

export const test1 = functions.https.onRequest((req, res) => {
    res.send("-------");
});

export const test2 = functions.https.onRequest((req, res) => {
    const app = express();


    res.send("-------");
    
});