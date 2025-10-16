import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import * as fs from 'fs';

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

  findImage(fileName: string) {
    const ruta = join(__dirname, `../../src/upload/images`, fileName);

    try {
      if (!existsSync(ruta)) {
        return { state: false, path: null };
      } else {
        return { state: true, path: ruta };
      }
    } catch (error) {
      return { state: false, path: null };
    }
  }

  deleteImage(fileName: string) {
    const ruta = join(__dirname, `../../src/upload/images`, fileName);
    try {
      if (existsSync(ruta)) {
        fs.unlinkSync(ruta); // Eliminar el archivo
        return { state: true, error: null };
      } else {
        return { state: false, error: 'No existe la imagen' };
      }
    } catch (error) {
      return { state: false, error: error };
    }
  }
}
