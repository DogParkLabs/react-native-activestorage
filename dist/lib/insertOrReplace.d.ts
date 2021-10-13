declare type Item = {
    [key: string]: any;
};
declare const insertOrReplace: <T extends Item>(list: T[], obj: T, key?: string) => T[];
export default insertOrReplace;
