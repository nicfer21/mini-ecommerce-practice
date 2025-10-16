"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductcreatedService = void 0;
const common_1 = require("@nestjs/common");
let ProductcreatedService = class ProductcreatedService {
    create(createProductcreatedDto) {
        return 'This action adds a new productcreated';
    }
    findAll() {
        return `This action returns all productcreated`;
    }
    findOne(id) {
        return `This action returns a #${id} productcreated`;
    }
    update(id, updateProductcreatedDto) {
        return `This action updates a #${id} productcreated`;
    }
    remove(id) {
        return `This action removes a #${id} productcreated`;
    }
};
exports.ProductcreatedService = ProductcreatedService;
exports.ProductcreatedService = ProductcreatedService = __decorate([
    (0, common_1.Injectable)()
], ProductcreatedService);
//# sourceMappingURL=productcreated.service.js.map