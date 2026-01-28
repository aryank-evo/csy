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
exports.CmsContent = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let CmsContent = class CmsContent extends sequelize_typescript_1.Model {
};
exports.CmsContent = CmsContent;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], CmsContent.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'component_name'
    }),
    __metadata("design:type", String)
], CmsContent.prototype, "componentName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'field_name'
    }),
    __metadata("design:type", String)
], CmsContent.prototype, "fieldName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: 'text',
        field: 'content_type'
    }),
    __metadata("design:type", String)
], CmsContent.prototype, "contentType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        field: 'content_value'
    }),
    __metadata("design:type", String)
], CmsContent.prototype, "contentValue", void 0);
exports.CmsContent = CmsContent = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "cms_content",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    })
], CmsContent);
