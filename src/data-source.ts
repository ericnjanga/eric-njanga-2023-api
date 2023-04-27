import { DataSource } from 'typeorm';
import { Project } from './models/Project';
import { Industry } from './models/Industry';
import { Category } from './models/Category';
import { Technology } from './models/Technology';
import { Tool } from './models/Tool';
import { Status } from './models/Status';

/*
You need to install reflect-metadata shim:
npm install reflect-metadata --save
and import it somewhere in the global place of your app (for example in app.ts):

// import "reflect-metadata"
*/



export const AppDataSource = new DataSource({
    type        : 'postgres',
    host        : process.env.DB_HOST,
    username    : process.env.DB_USERNAME,
    password    : process.env.DB_PASSWORD,
    port        : parseInt(process.env.DB_PORT),
    database    : process.env.DB_NAME,
    ssl         : true, //to simulate production env

    // The server expects a client SSL certificate that has a signature recognized by the server
    extra       : {
        ssl : {
            rejectUnauthorized: false
        }
    },
    entities    : [
        Project,
        Industry,
        Category,
        Technology,
        Tool,
        Status
    ],

    // [ONLY USE IN DEV MODE]
    // create tables in case they don't exist yet
    synchronize : true, 
    logging     : true // So that we know what's going on with the database
});