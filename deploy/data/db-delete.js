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
function deleteDb() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.initialize()];
                case 1:
                    _a.sent();
                    console.log("Database connection ready.");
                    console.log("Clearing STATUS table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Status_1.Status)
                            .delete({})];
                case 2:
                    _a.sent();
                    console.log("Clearing CATEGORY table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Category_1.Category)
                            .delete({})];
                case 3:
                    _a.sent();
                    console.log("Clearing INDUSRTRY table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Industry_1.Industry)
                            .delete({})];
                case 4:
                    _a.sent();
                    console.log("Clearing TECHNOLOGY table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Technology_1.Technology)
                            .delete({})];
                case 5:
                    _a.sent();
                    console.log("Clearing TOOL table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Tool_1.Tool)
                            .delete({})];
                case 6:
                    _a.sent();
                    console.log("Clearing DESCRIPTION table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Description_1.Description)
                            .delete({})];
                case 7:
                    _a.sent();
                    console.log("Clearing LINK table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Link_1.Link)
                            .delete({})];
                case 8:
                    _a.sent();
                    console.log("Clearing REFERENCE table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Reference_1.Reference)
                            .delete({})];
                case 9:
                    _a.sent();
                    console.log("Clearing IMAGES table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Image_1.Image)
                            .delete({})];
                case 10:
                    _a.sent();
                    console.log("Clearing PROJECTS table.");
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Project_1.Project)
                            .delete({})];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
deleteDb()
    .then(function () {
    console.log("Finished deleting database!");
    process.exit(0);
})
    .catch(function (err) {
    console.error("Error deleting database.", err);
});
