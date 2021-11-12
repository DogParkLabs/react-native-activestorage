import { File } from '../types';
interface CreateBlobRecordParams {
    directUploadsUrl: string;
    file: File;
    headers?: object;
}
declare const createBlobRecord: ({ directUploadsUrl, file, headers }: CreateBlobRecordParams) => Promise<any>;
export default createBlobRecord;
