"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const fs = __importStar(require("fs"));
let UploadService = class UploadService {
    async uploadImage(file) {
        try {
            const metadata = await (0, sharp_1.default)(file.buffer).metadata();
            const { width, height } = metadata;
            const maxSize = 1024;
            let maxSide = Math.max(width, height);
            let minSide = Math.min(width, height);
            const minSize = Math.round((minSide * maxSize) / maxSide);
            const newWidth = width >= height ? maxSize : minSize;
            const newHeight = width >= height ? minSize : maxSize;
            const newName = `image-${Date.now()}.webp`;
            const outPutPath = (0, path_1.join)(__dirname, `../../src/upload/images`, newName);
            await (0, sharp_1.default)(file.buffer)
                .resize({
                height: newHeight,
                width: newWidth,
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 },
            })
                .toFormat('webp')
                .toFile(outPutPath);
            return { fileName: newName, path: outPutPath };
        }
        catch (error) {
            return { fileName: null, path: null };
        }
    }
    findImage(fileName) {
        const ruta = (0, path_1.join)(__dirname, `../../src/upload/images`, fileName);
        try {
            if (!(0, fs_1.existsSync)(ruta)) {
                return { state: false, path: null };
            }
            else {
                return { state: true, path: ruta };
            }
        }
        catch (error) {
            return { state: false, path: null };
        }
    }
    deleteImage(fileName) {
        const ruta = (0, path_1.join)(__dirname, `../../src/upload/images`, fileName);
        try {
            if ((0, fs_1.existsSync)(ruta)) {
                fs.unlinkSync(ruta);
                return { state: true, error: null };
            }
            else {
                return { state: false, error: 'No existe la imagen' };
            }
        }
        catch (error) {
            return { state: false, error: error };
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map