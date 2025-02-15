import ReactNativeBlobUtil, { FetchBlobResponse, StatefulPromise } from 'react-native-blob-util';
import createBlobRecord from './createBlobRecord';
import { File, DirectUploadResult, HandleStatusUpdateData, BlobData } from '../types';
import { DirectUploadResultStatus } from './enums';

let id = 0;

interface DirectUploadParams {
  directUploadsUrl: string;
  file: File;
  headers?: object;
  onStatusChange: (data: DirectUploadResult) => void;
}

const directUpload = ({ directUploadsUrl, file, headers, onStatusChange }: DirectUploadParams) => {
  const taskId = ++id;
  let canceled = false;
  let task: StatefulPromise<FetchBlobResponse>;

  const handleCancel = () => {
    if (!task) {
      return;
    }

    canceled = true;
    task.cancel();
  };

  const handleStatusUpdate = (data: HandleStatusUpdateData) => {
    onStatusChange({ ...data, id: taskId, cancel: handleCancel, file });
  };

  handleStatusUpdate({ status: DirectUploadResultStatus.waiting });

  return new Promise<BlobData | void>(async (resolve) => {
    try {
      const blobData = await createBlobRecord({
        directUploadsUrl,
        file,
        headers,
      });

      const fileData = ReactNativeBlobUtil.wrap(file.path);

      task = ReactNativeBlobUtil.fetch('PUT', blobData.direct_upload.url, blobData.direct_upload.headers, fileData);

      task
        .uploadProgress({ interval: 250 }, (uploadedBytes, totalBytes) => {
          const progress = (uploadedBytes / totalBytes) * 100;
          handleStatusUpdate({ status: DirectUploadResultStatus.uploading, progress, totalBytes, uploadedBytes });
        })
        .then((resp) => {
          const status = resp.info().status;
          if (status >= 200 && status < 400) {
            handleStatusUpdate({ status: DirectUploadResultStatus.success, blobData });
          } else {
            handleStatusUpdate({ status: DirectUploadResultStatus.error, error: new Error('Response not success') });
          }

          resolve(blobData);
        })
        .catch((err) => {
          if (canceled) {
            handleStatusUpdate({ status: DirectUploadResultStatus.canceled });
          } else {
            handleStatusUpdate({ status: DirectUploadResultStatus.error, error: err });
          }

          resolve();
        });
    } catch (err) {
      handleStatusUpdate({ status: DirectUploadResultStatus.error, error: err });
      return resolve();
    }
  });
};

export default directUpload;
