"use strict";
// Environment variables must be loading before anything else
// import * as dotenv from 'dotenv';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// const result = dotenv.config();
require("reflect-metadata"); // works with typeorm library (mustbe imported before any data source)
var db_data_1 = require("./db-data");
var data_source_1 = require("../data-source");
var Project_1 = require("../models/Project");
var Category_1 = require("../models/Category");
var Industry_1 = require("../models/Industry");
var Technology_1 = require("../models/Technology");
var Tool_1 = require("../models/Tool");
var Status_1 = require("../models/Status");
var Description_1 = require("../models/Description");
var Link_1 = require("../models/Link");
var Reference_1 = require("../models/Reference");
var Image_1 = require("../models/Image");
function populateDb() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var projects, projectRepository, industryRepository, categoryRepository, technologyRepository, toolRepository, statusRepository, descriptionRepository, linkRepository, referenceRepository, imageRepository, _i, projects_1, projectData, project, _b, _c, industryData, industry, _d, _e, categoryData, category, _f, _g, technologyData, technology, _h, _j, toolData, tool, statusData, status_1, descriptionData, description, linkData, link, referenceData, reference, imageData, image, totalProjects, totalCategories;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.initialize()];
                case 1:
                    _k.sent();
                    console.log("Database connection ready.");
                    projects = Object.values(db_data_1.PROJECTS);
                    projectRepository = data_source_1.AppDataSource.getRepository(Project_1.Project);
                    industryRepository = data_source_1.AppDataSource.getRepository(Industry_1.Industry);
                    categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
                    technologyRepository = data_source_1.AppDataSource.getRepository(Technology_1.Technology);
                    toolRepository = data_source_1.AppDataSource.getRepository(Tool_1.Tool);
                    statusRepository = data_source_1.AppDataSource.getRepository(Status_1.Status);
                    descriptionRepository = data_source_1.AppDataSource.getRepository(Description_1.Description);
                    linkRepository = data_source_1.AppDataSource.getRepository(Link_1.Link);
                    referenceRepository = data_source_1.AppDataSource.getRepository(Reference_1.Reference);
                    imageRepository = data_source_1.AppDataSource.getRepository(Image_1.Image);
                    _i = 0, projects_1 = projects;
                    _k.label = 2;
                case 2:
                    if (!(_i < projects_1.length)) return [3 /*break*/, 30];
                    projectData = projects_1[_i];
                    // Save projects
                    console.log("Inserting project ".concat((_a = projectData === null || projectData === void 0 ? void 0 : projectData.descriptions) === null || _a === void 0 ? void 0 : _a.title));
                    project = projectRepository.create(projectData);
                    return [4 /*yield*/, projectRepository.save(project)];
                case 3:
                    _k.sent();
                    if (!projectData.industries) return [3 /*break*/, 7];
                    _b = 0, _c = projectData.industries;
                    _k.label = 4;
                case 4:
                    if (!(_b < _c.length)) return [3 /*break*/, 7];
                    industryData = _c[_b];
                    console.log("--------> Inserting industry ".concat(industryData.title));
                    industry = industryRepository.create(industryData);
                    industry.project = project; // Link industry to project
                    return [4 /*yield*/, industryRepository.save(industry)];
                case 5:
                    _k.sent();
                    _k.label = 6;
                case 6:
                    _b++;
                    return [3 /*break*/, 4];
                case 7:
                    if (!projectData.categories) return [3 /*break*/, 11];
                    _d = 0, _e = projectData.categories;
                    _k.label = 8;
                case 8:
                    if (!(_d < _e.length)) return [3 /*break*/, 11];
                    categoryData = _e[_d];
                    console.log("--------> (1) Inserting category ".concat(categoryData.title));
                    category = categoryRepository.create(categoryData);
                    category.project = project; // Link category to project
                    return [4 /*yield*/, categoryRepository.save(category)];
                case 9:
                    _k.sent();
                    _k.label = 10;
                case 10:
                    _d++;
                    return [3 /*break*/, 8];
                case 11:
                    if (!projectData.technologies) return [3 /*break*/, 15];
                    _f = 0, _g = projectData.technologies;
                    _k.label = 12;
                case 12:
                    if (!(_f < _g.length)) return [3 /*break*/, 15];
                    technologyData = _g[_f];
                    console.log("--------> (2) Inserting technology ".concat(technologyData.title));
                    technology = technologyRepository.create(technologyData);
                    technology.project = project; // Link technology to project
                    return [4 /*yield*/, technologyRepository.save(technology)];
                case 13:
                    _k.sent();
                    _k.label = 14;
                case 14:
                    _f++;
                    return [3 /*break*/, 12];
                case 15:
                    if (!projectData.tools) return [3 /*break*/, 19];
                    _h = 0, _j = projectData.tools;
                    _k.label = 16;
                case 16:
                    if (!(_h < _j.length)) return [3 /*break*/, 19];
                    toolData = _j[_h];
                    console.log("--------> (3) Inserting tool ".concat(toolData.title));
                    tool = toolRepository.create(toolData);
                    tool.project = project; // Link tool to project
                    return [4 /*yield*/, toolRepository.save(tool)];
                case 17:
                    _k.sent();
                    _k.label = 18;
                case 18:
                    _h++;
                    return [3 /*break*/, 16];
                case 19:
                    if (!projectData.status) return [3 /*break*/, 21];
                    statusData = projectData.status;
                    console.log("--------> (4) Inserting status ".concat(statusData.title));
                    status_1 = statusRepository.create(statusData);
                    status_1.project = project; // Link status to project
                    return [4 /*yield*/, statusRepository.save(status_1)];
                case 20:
                    _k.sent();
                    _k.label = 21;
                case 21:
                    if (!projectData.descriptions) return [3 /*break*/, 23];
                    descriptionData = projectData.descriptions;
                    console.log("--------> (5) Inserting description ".concat(descriptionData.title));
                    description = descriptionRepository.create(descriptionData);
                    description.project = project; // Link description to project
                    return [4 /*yield*/, descriptionRepository.save(description)];
                case 22:
                    _k.sent();
                    _k.label = 23;
                case 23:
                    if (!projectData.links) return [3 /*break*/, 25];
                    linkData = projectData.links;
                    console.log("--------> (6) Inserting link ".concat(linkData.id));
                    link = linkRepository.create(linkData);
                    link.project = project; // Link link to project
                    return [4 /*yield*/, linkRepository.save(link)];
                case 24:
                    _k.sent();
                    _k.label = 25;
                case 25:
                    if (!projectData.references) return [3 /*break*/, 27];
                    referenceData = projectData.references;
                    console.log("--------> (7) Inserting reference ".concat(referenceData.name));
                    reference = referenceRepository.create(referenceData);
                    reference.project = project; // Link reference to project
                    return [4 /*yield*/, referenceRepository.save(reference)];
                case 26:
                    _k.sent();
                    _k.label = 27;
                case 27:
                    if (!projectData.images) return [3 /*break*/, 29];
                    imageData = projectData.images;
                    console.log("--------> (8) Inserting image ".concat(imageData.hero));
                    image = imageRepository.create(imageData);
                    image.project = project; // Link image to project
                    return [4 /*yield*/, imageRepository.save(image)];
                case 28:
                    _k.sent();
                    _k.label = 29;
                case 29:
                    _i++;
                    return [3 /*break*/, 2];
                case 30:
                    totalProjects = projectRepository
                        .createQueryBuilder()
                        .getCount();
                    totalCategories = categoryRepository
                        .createQueryBuilder()
                        .getCount();
                    console.log("Data Inserted - projects ".concat(totalProjects, ", categories ").concat(totalCategories));
                    return [2 /*return*/];
            }
        });
    });
}
populateDb()
    .then(function () {
    console.log("Finished populating database!");
    process.exit(0);
})
    .catch(function (err) {
    console.error("Error populating database.", err);
});
