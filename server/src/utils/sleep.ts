// Need to put relative paths, default absolute paths will crash the app
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
