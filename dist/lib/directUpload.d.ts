import { File, DirectUploadResult } from '../types';
interface DirectUploadParams {
    directUploadsUrl: string;
    file: File;
    headers?: object;
    onStatusChange: (data: DirectUploadResult) => void;
}
declare const directUpload: ({ directUploadsUrl, file, headers, onStatusChange }: DirectUploadParams) => Promise<string | void>;
export default directUpload;
