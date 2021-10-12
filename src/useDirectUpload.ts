import { useMemo, useState, useCallback } from 'react';
import { File, DirectUploadResult } from './types';
import directUpload from './lib/directUpload';
import insertOrReplace from './lib/insertOrReplace';
import useConfig from './useConfig';

interface OnSuccessParams {
  signedIds: string[];
}

export type Params = {
  onSuccess?: (params: OnSuccessParams) => void;
}

const useDirectUpload = ({ onSuccess }: Params = {}) => {
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

      return { signedIds: validIds }
    },
    [handleFileUploadChange, onSuccess]
  );

  const uploading = useMemo(() => uploads.some((upload) => upload.status === 'uploading'), [uploads]);

  return {
    upload,
    uploads,
    uploading,
    resetUploads: () => setUploads([])
  };
};

export default useDirectUpload;
