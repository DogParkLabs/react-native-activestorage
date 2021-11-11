import { File, DirectUploadResult, DirectUploadResultSuccess } from './types';
interface OnSuccessParams {
    signedIds: string[];
}
export declare type Params = {
    onSuccess?: (params: OnSuccessParams) => void;
    onError?: () => void;
};
declare const useDirectUpload: ({ onSuccess, onError }?: Params) => {
    upload: (files: File[]) => Promise<{
        signedIds: string[];
    }>;
    uploads: DirectUploadResult[];
    isUploading: boolean;
    successfulUploads: DirectUploadResultSuccess[];
    resetUploads: () => void;
    removeUpload: (id: number) => void;
};
export default useDirectUpload;
