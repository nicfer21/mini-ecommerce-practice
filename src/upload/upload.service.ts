import { Injectable } from '@nestjs/common';
import { max, min } from 'class-validator';
import path, { join } from 'path';
import sharp from 'sharp';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File) {
    try {
      const metadata = await sharp(file.buffer).metadata();

      const { width, height } = metadata;

      const maxSize = 1024; // Tamaño máximo deseado

      let maxSide: number = Math.max(width, height);
      let minSide: number = Math.min(width, height);

      const minSize = Math.round((minSide * maxSize) / maxSide);

      const newWidth = width >= height ? maxSize : minSize;
      const newHeight = width >= height ? minSize : maxSize;

      const newName = `image-${Date.now()}.webp`;

      const outPutPath = join(__dirname, `../../src/upload/images`, newName);

      await sharp(file.buffer)
        .resize({
          height: newHeight,
          width: newWidth,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .toFormat('webp')
        .toFile(outPutPath);

      return { fileName: newName, path: outPutPath };
    } catch (error) {
      return { fileName: null, path: null };
    }
  }
}
