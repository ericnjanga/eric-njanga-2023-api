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
exports.getProjectDetail = void 0;
var logger_1 = require("../logger");
var data_source_1 = require("../data-source");
var Project_1 = require("../models/Project");
var Description_1 = require("../models/Description");
var Link_1 = require("../models/Link");
var Reference_1 = require("../models/Reference");
var Category_1 = require("../models/Category");
var Tool_1 = require("../models/Tool");
var Image_1 = require("../models/Image");
/*

    @Column()
    git!       : string;

    @Column()
    figma!         : string;

    @Column()
    figmaJam!        : string;

    @Column()
    prototype!         : string;

    @Column()
    presentation!         : string;

    @Column()
    live!         : string;
    */
function getProjectDetail(request, response, next) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var projectPageUrl, project, message, desc, _g, _h, _j, link, _k, _l, _m, refs, _o, _p, _q, cats, _r, _s, _t, tls, _u, _v, _w, img, _x, _y, _z, _0, intro, descriptions, links, references, categories, tools, images, error_1;
        var _1, _2, _3, _4, _5, _6;
        return __generator(this, function (_7) {
            switch (_7.label) {
                case 0:
                    _7.trys.push([0, 8, , 9]);
                    logger_1.logger.debug("Called getProjectDetail()");
                    projectPageUrl = request.params.pageUrl;
                    // Validate all parameters
                    if (!projectPageUrl) {
                        throw "Could not extract the project url from the request.";
                    }
                    project = data_source_1.AppDataSource
                        .getRepository(Project_1.Project)
                        .findOneBy({
                        pageUrl: projectPageUrl
                    });
                    if (!project) {
                        message = "Could not find a project with pageUrl ".concat(projectPageUrl);
                        logger_1.logger.error(message);
                        response.status(404).json({ message: message });
                        return [2 /*return*/];
                    }
                    _h = (_g = data_source_1.AppDataSource
                        .getRepository(Description_1.Description)
                        .createQueryBuilder('description'))
                        .where;
                    _j = ['description.projectId = :projectId'];
                    _1 = {};
                    return [4 /*yield*/, project];
                case 1:
                    desc = _h.apply(_g, _j.concat([(_1.projectId = (_a = (_7.sent())) === null || _a === void 0 ? void 0 : _a.id,
                            _1)]))
                        .getOne();
                    _l = (_k = data_source_1.AppDataSource
                        .getRepository(Link_1.Link)
                        .createQueryBuilder('link'))
                        .where;
                    _m = ['link.projectId = :projectId'];
                    _2 = {};
                    return [4 /*yield*/, project];
                case 2:
                    link = _l.apply(_k, _m.concat([(_2.projectId = (_b = (_7.sent())) === null || _b === void 0 ? void 0 : _b.id,
                            _2)]))
                        .getOne();
                    _p = (_o = data_source_1.AppDataSource
                        .getRepository(Reference_1.Reference)
                        .createQueryBuilder('reference'))
                        .where;
                    _q = ['reference.projectId = :projectId'];
                    _3 = {};
                    return [4 /*yield*/, project];
                case 3:
                    refs = _p.apply(_o, _q.concat([(_3.projectId = (_c = (_7.sent())) === null || _c === void 0 ? void 0 : _c.id,
                            _3)]))
                        .getOne();
                    _s = (_r = data_source_1.AppDataSource
                        .getRepository(Category_1.Category)
                        .createQueryBuilder('category'))
                        .where;
                    _t = ['category.projectId = :projectId'];
                    _4 = {};
                    return [4 /*yield*/, project];
                case 4:
                    cats = _s.apply(_r, _t.concat([(_4.projectId = (_d = (_7.sent())) === null || _d === void 0 ? void 0 : _d.id,
                            _4)]))
                        .getMany();
                    _v = (_u = data_source_1.AppDataSource
                        .getRepository(Tool_1.Tool)
                        .createQueryBuilder('tool'))
                        .where;
                    _w = ['tool.projectId = :projectId'];
                    _5 = {};
                    return [4 /*yield*/, project];
                case 5:
                    tls = _v.apply(_u, _w.concat([(_5.projectId = (_e = (_7.sent())) === null || _e === void 0 ? void 0 : _e.id,
                            _5)]))
                        .getMany();
                    _y = (_x = data_source_1.AppDataSource
                        .getRepository(Image_1.Image)
                        .createQueryBuilder('image'))
                        .where;
                    _z = ['image.projectId = :projectId'];
                    _6 = {};
                    return [4 /*yield*/, project];
                case 6:
                    img = _y.apply(_x, _z.concat([(_6.projectId = (_f = (_7.sent())) === null || _f === void 0 ? void 0 : _f.id,
                            _6)]))
                        .getOne();
                    return [4 /*yield*/, Promise.all([
                            project,
                            desc,
                            link,
                            refs,
                            cats,
                            tls,
                            img
                        ])];
                case 7:
                    _0 = _7.sent(), intro = _0[0], descriptions = _0[1], links = _0[2], references = _0[3], categories = _0[4], tools = _0[5], images = _0[6];
                    // Building the HTTP response
                    response.status(200).json({ intro: intro, descriptions: descriptions, links: links, references: references, categories: categories, tools: tools, images: images });
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _7.sent();
                    logger_1.logger.error("Error calling getProjectDetail()");
                    return [2 /*return*/, next(error_1)];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.getProjectDetail = getProjectDetail;
