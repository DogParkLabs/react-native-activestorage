import { useMemo, useState, useCallback } from 'react';
import { File, DirectUploadResult, DirectUploadResultSuccess, DirectUploadResultStatus } from './types';
import directUpload from './lib/directUpload';
import insertOrReplace from './lib/insertOrReplace';
import useConfig from './useConfig';

interface OnSuccessParams {
  signedIds: string[];
}

export type Params = {
  onSuccess?: (params: OnSuccessParams) => void;
  onError?: () => void;
}

const useDirectUpload = ({ onSuccess, onError }: Params = {}) => {
  const { directUploadsUrl, headers } = useConfig();
  const [uploads, setUploads] = useState<DirectUploadResult[]>([]);

  const handleFileUploadChange = useCallback((fileUpload: DirectUploadResult) => {
    setUploads((fileUploads) => insertOrReplace(fileUploads, fileUpload));
  }, []);

  const upload = useCallback(
    async (files: File[]) => {
      const signedIds = await Promise.all(
        files.map((file) =>
          directUpload({ file, directUploadsUrl, headers, onStatusChange: handleFileUploadChange })
        )
      );

      const validIds = signedIds.filter((it) => !!it) as string[];
      if (validIds.length > 0) {
        onSuccess && onSuccess({ signedIds: validIds });
      }

      if (files.length > validIds.length) {
        onError && onError();
      }

      return { signedIds: validIds }
    },
    [handleFileUploadChange, onSuccess, onError]
  );

  const isUploading = useMemo(() => (
    uploads.some((upload) => upload.status === DirectUploadResultStatus.uploading)
  ), [uploads]);
  const successfulUploads = useMemo(() => (
    uploads.filter((upload) => upload.status === DirectUploadResultStatus.success) as DirectUploadResultSuccess[]
  ), [uploads]);

  return {
    upload,
    uploads,
    isUploading,
    successfulUploads,
    resetUploads: () => setUploads([]),
    removeUpload: (id: number) => setUploads(uploads.filter(u => u.id !== id))
  };
};

export default useDirectUpload;
