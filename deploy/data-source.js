"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var Project_1 = require("./models/Project");
var Industry_1 = require("./models/Industry");
var Category_1 = require("./models/Category");
var Technology_1 = require("./models/Technology");
var Tool_1 = require("./models/Tool");
var Status_1 = require("./models/Status");
var Description_1 = require("./models/Description");
var Link_1 = require("./models/Link");
var Reference_1 = require("./models/Reference");
var Image_1 = require("./models/Image");
/*
You need to install reflect-metadata shim:
npm install reflect-metadata --save
and import it somewhere in the global place of your app (for example in app.ts):

// import "reflect-metadata"
*/
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: true,
    // The server expects a client SSL certificate that has a signature recognized by the server
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    entities: [
        Project_1.Project,
        Industry_1.Industry,
        Category_1.Category,
        Technology_1.Technology,
        Tool_1.Tool,
        Status_1.Status,
        Description_1.Description,
        Link_1.Link,
        Reference_1.Reference,
        Image_1.Image
    ],
    // [ONLY USE IN DEV MODE]
    // create tables in case they don't exist yet
    synchronize: true,
    logging: true // So that we know what's going on with the database
});
