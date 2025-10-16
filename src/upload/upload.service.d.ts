export declare class UploadService {
    uploadImage(file: Express.Multer.File): Promise<{
        fileName: string;
        path: string;
    } | {
        fileName: null;
        path: null;
    }>;
    findImage(fileName: string): {
        state: boolean;
        path: null;
    } | {
        state: boolean;
        path: string;
    };
    deleteImage(fileName: string): {
        state: boolean;
        error: any;
    };
}
