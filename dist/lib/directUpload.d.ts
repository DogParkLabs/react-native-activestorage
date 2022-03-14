import { File, DirectUploadResult, BlobData } from '../types';
interface DirectUploadParams {
    directUploadsUrl: string;
    file: File;
    headers?: object;
    onStatusChange: (data: DirectUploadResult) => void;
}
declare const directUpload: ({ directUploadsUrl, file, headers, onStatusChange }: DirectUploadParams) => Promise<void | BlobData>;
export default directUpload;
