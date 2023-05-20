"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var Industry_1 = require("./Industry");
var Technology_1 = require("./Technology");
var Tool_1 = require("./Tool");
var Status_1 = require("./Status");
var Description_1 = require("./Description");
var Link_1 = require("./Link");
var Reference_1 = require("./Reference");
var Image_1 = require("./Image");
//Decorator turns the class into a Typeorm model
var Project = exports.Project = /** @class */ (function () {
    function Project() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Project.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Project.prototype, "seqNo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Project.prototype, "pageUrl", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Industry_1.Industry; }, function (industry) { return industry.project; }),
        __metadata("design:type", Array)
    ], Project.prototype, "industries", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Category_1.Category; }, function (Category) { return Category.project; }),
        __metadata("design:type", Array)
    ], Project.prototype, "categories", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Technology_1.Technology; }, function (Technology) { return Technology.project; }),
        __metadata("design:type", Array)
    ], Project.prototype, "technologies", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Tool_1.Tool; }, function (Tool) { return Tool.project; }),
        __metadata("design:type", Array)
    ], Project.prototype, "tools", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Status_1.Status; }, function (Status) { return Status.project; }),
        __metadata("design:type", Status_1.Status)
    ], Project.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Description_1.Description; }, function (Description) { return Description.project; }),
        __metadata("design:type", Description_1.Description)
    ], Project.prototype, "descriptions", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Link_1.Link; }, function (Link) { return Link.project; }),
        __metadata("design:type", Link_1.Link)
    ], Project.prototype, "links", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Reference_1.Reference; }, function (Reference) { return Reference.project; }),
        __metadata("design:type", Reference_1.Reference)
    ], Project.prototype, "references", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Image_1.Image; }, function (Image) { return Image.project; }),
        __metadata("design:type", Image_1.Image)
    ], Project.prototype, "images", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Project.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Project.prototype, "lastUpdatedAt", void 0);
    Project = __decorate([
        (0, typeorm_1.Entity)({
            name: 'PROJECTS'
        })
    ], Project);
    return Project;
}());
