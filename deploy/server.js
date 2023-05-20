"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Environment variables must be loading before anything else
var dotenv = require("dotenv");
var result = dotenv.config();
if (result.error) {
    console.log("Error loading environment variables, aborting.");
    process.exit(1);
}
/**
 * All other imports must be happening after the environment variable has been loaded
 */
require("reflect-metadata"); // works with typeorm library (mustbe imported before any data source)
var express = require("express");
var root_1 = require("./routes/root");
var utils_1 = require("./utils");
var logger_1 = require("./logger");
var data_source_1 = require("./data-source");
var getProjects_1 = require("./routes/getProjects");
var project_update_1 = require("./routes/project-update");
var project_create_1 = require("./routes/project-create");
var project_delete_1 = require("./routes/project-delete");
var getProjectDetail_1 = require("./routes/getProjectDetail");
var default_error_handler_1 = require("./middlewares/default-error-handler");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
function setupExpress() {
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
    app.use(cors({ origin: true })); // support added for CORS (Cross Origin Requests)
    app.use(bodyParser.json()); // Body parser for PUT and CREATE requests
    // When the browser is on the home route, get also the server home route.
    app.route('/').get(root_1.root);
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
    app.route('/api/projects').get(getProjects_1.getProjects);
    /**
     * GET A SINGLE PROJECT
     * ----------------
     * Query params:
     * - pageUrl
     *
     * Query: api/projects/url-of-the-project
     */
    app.route('/api/projects/:pageUrl').get(getProjectDetail_1.getProjectDetail);
    /**
     * CRUD OPERATIONS
     * ----------------
     * - Update
     * - Create
     * - Delete
     */
    app.route('/api/projects/:projectId').patch(project_update_1.updateProject);
    app.route('/api/projects').post(project_create_1.createProject);
    app.route('/api/projects/:projectId').delete(project_delete_1.deleteProjectAndConnections);
    //use the default herror handler is any issue happens with these routes
    app.use(default_error_handler_1.defaultErrorHandler);
}
function setupServer() {
    var portEnv = process.env.PORT || '3000', portArg = process.argv[2];
    var port;
    /**
     * - Use the port environment if available
     * - Otherwise, use the port number provided in command line
     * - Otherwise, use the default port numbe
     */
    if ((0, utils_1.isInteger)(portEnv)) {
        port = parseInt(portEnv);
    }
    else if ((0, utils_1.isInteger)(portArg)) {
        port = parseInt(portArg);
    }
    else {
        port = 9000;
    }
    logger_1.logger.info(process.argv);
    app.listen(port, function () {
        logger_1.logger.info("HTTP rest api server is now running at http://localhost:".concat(port, "/"));
    });
}
/**
 * Initialize the datasource first
 */
data_source_1.AppDataSource.initialize()
    .then(function () {
    // Before starting the server
    logger_1.logger.info("The datasource has been initialized successfully.");
    setupExpress();
    setupServer();
})
    .catch(function (err) {
    logger_1.logger.info("Error during datasource initialization.", err);
    process.exit();
});
