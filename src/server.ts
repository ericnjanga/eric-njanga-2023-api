
// Environment variables must be loading before anything else
import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    console.log(`Error loading environment variables, aborting.`);
    process.exit(1);
}


/**
 * All other imports must be happening after the environment variable has been loaded
 */
import 'reflect-metadata'; // works with typeorm library (mustbe imported before any data source)
import * as express from 'express';
import { root } from './routes/root';
import { isInteger } from './utils';
import { logger } from './logger';
import { AppDataSource } from './data-source';
import { getProjects } from './routes/getProjects';
import { updateProject } from './routes/project-update';
import { createProject } from './routes/project-create';
import { deleteProjectAndConnections } from './routes/project-delete';
import { getProjectDetail } from './routes/getProjectDetail';
import { defaultErrorHandler } from './middlewares/default-error-handler';

const cors          = require('cors');
const bodyParser    = require('body-parser');
const app           = express();

function setupExpress () {

    /**
     * ROUTE STRUCTURE:
     * -------------------
     * https://www.figma.com/file/EwxPiImZE7dFQF0pr0npPl/Eric-Njanga-2023?node-id=0-1&t=1AoXr9gYcvnoejpW-0
     * 
     * There are 3 great parts:
     * ----
     * 1) Industries (uid, uxd)
     * 2) Categories (single-page-app, concept-design, ...)
     * 3) Specialities (Angular, mobile-prototyping, ...)
     * 
     * 0) All projects (regardless of industries, categories or specialities)
     * - /projects
     * 
     * 1) Industries (All projects of "uid" / "uxd")
     * ----
     * - /uid/projects/ 
     * - /uxd/projects/
     * 
     * 2) Industries > Categories (All projects of "uid" / "uxd" from a specific category) 
     * ----
     * - /uid/projects/:catId (example: uid/projects/single-page-app)
     * - /uxd/projects/:catId (example: uid/projects/concept-design)
     * 
     * 3) Industries > Categories + Specialties (All projects of "uid" / "uxd" from a specific category with 1+ specialities)
     * ---- 
     * - /uid/projects/:catId + specId (example: uid/projects/single-page-app + angular + ecommerce)
     * - /uxd/projects/:catId + specId (example: uid/projects/concept-design + mobile-prototyping + visual-design)
     */


    /**
     * TESTING THE API (in the terminal)
     * ---
     * 1) UPDATE (Updating the title of project of id: 172 )
     * curl -X PATCH http://localhost:7000/api/projects/172 -H "Content-Type:application/json" -d '{"title":"Loblaws Marketplace ***"}'
     * 
     * 2) CREATE (A new project)
     * curl -X POST http://localhost:7000/api/projects/ -H "Content-Type:application/json" -d '{"title": "???", "refName": "???", "liveUrl": "???", "thumbnail": "???", "shortDescription": "???" }'
     * 
     * 3) DELETE (A projects and all associated records in the database)
     * curl -X DELETE http://localhost:7000/api/projects/213
     */


    app.use(cors({ origin: true }));    // support added for CORS (Cross Origin Requests)
    app.use(bodyParser.json());         // Body parser for PUT and CREATE requests

    // When the browser is on the home route, get also the server home route.
    app.route('/').get(root);

    
    /**
     * GET ALL PROJECTS
     * ----------------
     * Query params:
     * - status     (of type statusType)
     * - industry   (of type industryType)
     * - pageNumber
     * - pageSize
     * 
     * Query: api/projects?status=${published}&industry=${industry}&pageNumber=${pageNumber}&pageSize=${pageSize}
     */
    app.route('/api/projects').get(getProjects);
    

    /**
     * GET A SINGLE PROJECT
     * ----------------
     * Query params:
     * - pageUrl
     * 
     * Query: api/projects/url-of-the-project
     */
    app.route('/api/projects/:pageUrl').get(getProjectDetail);


    /**
     * CRUD OPERATIONS
     * ----------------
     * - Update
     * - Create
     * - Delete
     */
    app.route('/api/projects/:projectId').patch(updateProject);
    app.route('/api/projects').post(createProject);
    app.route('/api/projects/:projectId').delete(deleteProjectAndConnections);

    //use the default herror handler is any issue happens with these routes
    app.use(defaultErrorHandler); 
}


function setupServer () {
    const portEnv = process.env.PORT || '3000',
    portArg = process.argv[2];
    let port;

    /**
     * - Use the port environment if available
     * - Otherwise, use the port number provided in command line
     * - Otherwise, use the default port numbe
     */
    if (isInteger(portEnv)) {
        port = parseInt(portEnv);
    } 
    else if (isInteger(portArg)) {
        port = parseInt(portArg);
    }
    else {
        port = 9000;
    }

    logger.info(process.argv);
    
    app.listen(port, ()=>{
        logger.info(`HTTP rest api server is now running at http://localhost:${port}/`)
    })
}





/**
 * Initialize the datasource first
 */
AppDataSource.initialize()
    .then(() => {
        // Before starting the server
        logger.info(`The datasource has been initialized successfully.`);
        setupExpress();
        setupServer();
    })
    .catch(err => {
        logger.info(`Error during datasource initialization.`, err);
        process.exit();
    });
