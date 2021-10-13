import { File, DirectUploadResult } from './types';
interface OnSuccessParams {
    signedIds: string[];
}
export declare type Params = {
    onSuccess?: (params: OnSuccessParams) => void;
};
declare const useDirectUpload: ({ onSuccess }?: Params) => {
    upload: (files: File[]) => Promise<{
        signedIds: string[];
    }>;
    uploads: DirectUploadResult[];
    isUploading: boolean;
    resetUploads: () => void;
    removeUpload: (id: number) => void;
};
export default useDirectUpload;
