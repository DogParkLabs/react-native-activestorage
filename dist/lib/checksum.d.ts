declare const checksum: ({ path }: {
    path: string;
}) => Promise<string | null>;
export default checksum;
