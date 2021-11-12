declare const useConfig: () => {
    mountPath: string;
    directUploadsUrl: string;
    host: string;
    headers?: object | undefined;
};
export default useConfig;
