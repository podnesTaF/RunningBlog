export declare enum FileType {
    IMAGE = "image",
    AVATAR = "avatar"
}
export declare class FileService {
    createFile(type: FileType, file: any): string;
}
