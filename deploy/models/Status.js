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
exports.Status = void 0;
var typeorm_1 = require("typeorm");
var Project_1 = require("./Project");
//Decorator turns the class into a Typeorm model
var Status = exports.Status = /** @class */ (function () {
    function Status() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Status.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Status.prototype, "seqNo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Status.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Status.prototype, "shortDescription", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Project_1.Project; }, function (project) { return project.status; }),
        (0, typeorm_1.JoinColumn)({
            //name of the column that we want to use 
            //to link this table to the "project" table
            name: 'projectId'
        }),
        __metadata("design:type", Project_1.Project)
    ], Status.prototype, "project", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Status.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Status.prototype, "lastUpdatedAt", void 0);
    Status = __decorate([
        (0, typeorm_1.Entity)({
            name: 'STATUSES'
        })
    ], Status);
    return Status;
}());
