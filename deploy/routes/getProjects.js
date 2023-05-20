"use strict";
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
exports.getProjects = void 0;
var logger_1 = require("../logger");
var utils_1 = require("../utils");
var data_source_1 = require("../data-source");
var Project_1 = require("../models/Project");
/**
 *
 * TODO:
 * 1) Refactor this function to only return the following properties per poroject:
 * --------------
 * - categories(title, refName) -> many()
 * - reference.startDate
 * - description.title
 * - images.hero
 * - link.pageUrl
 *
 * 2) Keep that filter results by:
 * - status
 * - industry
 *
 * 3) Make sure property naming is consistent between "project" and "projectDescription"
 * (descriptions, categories, references, images, tools)
 */
function getProjects(request, response, next) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var query, status_1, industry, pageNumber, pageSize, projects, _e, payload, total, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 2, , 3]);
                    logger_1.logger.debug("Called getAllProject()");
                    query = request.query, status_1 = (_a = query.status) !== null && _a !== void 0 ? _a : 'all', industry = (_b = query.industry) !== null && _b !== void 0 ? _b : 'all', pageNumber = (_c = query.pageNumber) !== null && _c !== void 0 ? _c : '0', pageSize = (_d = query.pageSize) !== null && _d !== void 0 ? _d : '100';
                    // Make sure pagination data is ok
                    if (!(0, utils_1.isInteger)(pageNumber)) {
                        throw "Invalid page number ".concat(pageNumber);
                    }
                    if (!(0, utils_1.isInteger)(pageSize)) {
                        throw "Invalid page size ".concat(pageSize);
                    }
                    projects = data_source_1.AppDataSource
                        .getRepository(Project_1.Project)
                        .createQueryBuilder('projects')
                        .leftJoinAndSelect('projects.descriptions', 'descriptions') // with all descriptions
                        .leftJoinAndSelect('projects.categories', 'categories') // with all categories
                        .leftJoinAndSelect('projects.references', 'references') // with all references
                        .leftJoinAndSelect('projects.images', 'images') // with all images
                        .leftJoinAndSelect('projects.tools', 'tools');
                    // Filter by "status" only if the "status" is provided and of type "status"
                    if (!(0, utils_1.isStatusType)(status_1)) {
                        projects = projects.leftJoinAndSelect('projects.status', 'statuses');
                    }
                    else {
                        projects = projects.innerJoinAndSelect('projects.status', 'statuses', 'statuses.title = :bTitle', { bTitle: status_1 });
                    }
                    // Filter by "industryRef" only if the "industryRef" is provided and of type "industryRef"
                    if (!(0, utils_1.isIndustryRefType)(industry)) {
                        projects = projects.leftJoinAndSelect('projects.industries', 'industries');
                    }
                    else {
                        projects = projects.innerJoinAndSelect('projects.industries', 'industries', 'industries.refName = :cTitle', { cTitle: industry });
                    }
                    // Order by the most recent and add the pagination
                    projects = projects.orderBy('projects.seqNo', 'DESC')
                        .skip(pageNumber * pageSize) // Position from where to start taking results
                        .take(pageSize);
                    return [4 /*yield*/, Promise.all([
                            projects.getMany(),
                            projects.getCount(),
                        ])];
                case 1:
                    _e = _f.sent(), payload = _e[0], total = _e[1];
                    // Building the HTTP response
                    response.status(200).json({ payload: payload, total: total });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _f.sent();
                    logger_1.logger.error("Error calling getProjects()");
                    return [2 /*return*/, next(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProjects = getProjects;
