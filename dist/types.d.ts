export declare type FileMetadata = {
    [key: string]: any;
};
export interface File {
    name: string;
    size: number;
    type: string;
    path: string;
    metadata?: FileMetadata;
}
export declare enum DirectUploadResultStatus {
    success = "success",
    uploading = "uploading",
    error = "error",
    waiting = "waiting",
    canceled = "canceled"
}
export interface DirectUploadResultBase {
    id: number;
    status: DirectUploadResultStatus;
    file: File;
    cancel: () => void;
}
export interface DirectUploadResultError extends DirectUploadResultBase {
    status: DirectUploadResultStatus.error;
    error: Error;
}
export interface DirectUploadResultSuccess extends DirectUploadResultBase {
    status: DirectUploadResultStatus.success;
    signed_id: string;
}
export interface DirectUploadResultWaiting extends DirectUploadResultBase {
    status: DirectUploadResultStatus.waiting;
}
export interface DirectUploadResultCanceled extends DirectUploadResultBase {
    status: DirectUploadResultStatus.canceled;
}
export interface DirectUploadResultUploading extends DirectUploadResultBase {
    status: DirectUploadResultStatus.uploading;
    progress: number;
    totalBytes: number;
    uploadedBytes: number;
}
export declare type DirectUploadResult = DirectUploadResultError | DirectUploadResultSuccess | DirectUploadResultWaiting | DirectUploadResultCanceled | DirectUploadResultUploading;
declare type WithoutDirectUploadBaseParams<T> = Omit<T, 'id' | 'cancel' | 'file'>;
export declare type HandleStatusUpdateData = WithoutDirectUploadBaseParams<DirectUploadResultError> | WithoutDirectUploadBaseParams<DirectUploadResultUploading> | WithoutDirectUploadBaseParams<DirectUploadResultWaiting> | WithoutDirectUploadBaseParams<DirectUploadResultCanceled> | WithoutDirectUploadBaseParams<DirectUploadResultSuccess>;
export {};
