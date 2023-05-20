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
exports.deleteProjectAndConnections = void 0;
var logger_1 = require("../logger");
var utils_1 = require("../utils");
var data_source_1 = require("../data-source");
var Project_1 = require("../models/Project");
var Category_1 = require("../models/Category");
var Industry_1 = require("../models/Industry");
var Status_1 = require("../models/Status");
var Technology_1 = require("../models/Technology");
var Tool_1 = require("../models/Tool");
function deleteProjectAndConnections(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var projectId_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    logger_1.logger.debug("Called deleteProjectAndConnections()");
                    projectId_1 = request.params.projectId;
                    // Validate all parameters
                    if (!(0, utils_1.isInteger)(projectId_1)) {
                        throw "Invalid project id ".concat(projectId_1);
                    }
                    // 1) Delete all records in the database associated with the project
                    // Industries / Categories / Statuses / Technologies / Tools
                    // ---
                    return [4 /*yield*/, data_source_1.AppDataSource.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // Delete all links to: industries
                                    return [4 /*yield*/, transactionalEntityManager
                                            .createQueryBuilder()
                                            .delete()
                                            .from(Industry_1.Industry)
                                            .where('projectId = :projectId', { projectId: projectId_1 })
                                            .execute()];
                                    case 1:
                                        // Delete all links to: industries
                                        _a.sent();
                                        // Delete all links to: categories
                                        return [4 /*yield*/, transactionalEntityManager
                                                .createQueryBuilder()
                                                .delete()
                                                .from(Category_1.Category)
                                                .where('projectId = :projectId', { projectId: projectId_1 })
                                                .execute()];
                                    case 2:
                                        // Delete all links to: categories
                                        _a.sent();
                                        // Delete all links to: statuses
                                        return [4 /*yield*/, transactionalEntityManager
                                                .createQueryBuilder()
                                                .delete()
                                                .from(Status_1.Status)
                                                .where('projectId = :projectId', { projectId: projectId_1 })
                                                .execute()];
                                    case 3:
                                        // Delete all links to: statuses
                                        _a.sent();
                                        // Delete all links to: technologies
                                        return [4 /*yield*/, transactionalEntityManager
                                                .createQueryBuilder()
                                                .delete()
                                                .from(Technology_1.Technology)
                                                .where('projectId = :projectId', { projectId: projectId_1 })
                                                .execute()];
                                    case 4:
                                        // Delete all links to: technologies
                                        _a.sent();
                                        // Delete all links to: tOOLS
                                        return [4 /*yield*/, transactionalEntityManager
                                                .createQueryBuilder()
                                                .delete()
                                                .from(Tool_1.Tool)
                                                .where('projectId = :projectId', { projectId: projectId_1 })
                                                .execute()];
                                    case 5:
                                        // Delete all links to: tOOLS
                                        _a.sent();
                                        // [FINALLY] Delete the project
                                        return [4 /*yield*/, transactionalEntityManager
                                                .createQueryBuilder()
                                                .delete()
                                                .from(Project_1.Project)
                                                .where('id = :projectId', { projectId: projectId_1 })
                                                .execute()];
                                    case 6:
                                        // [FINALLY] Delete the project
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    // 1) Delete all records in the database associated with the project
                    // Industries / Categories / Statuses / Technologies / Tools
                    // ---
                    _a.sent();
                    // Building the HTTP response
                    response.status(200).json({
                        message: "Project delete successfully ".concat(projectId_1)
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger_1.logger.error("Error calling deleteProjectAndConnections()");
                    return [2 /*return*/, next(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteProjectAndConnections = deleteProjectAndConnections;
