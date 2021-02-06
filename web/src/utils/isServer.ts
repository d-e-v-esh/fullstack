// if the window is undefined, that means we are in the server, if we can access the window object then we are in the browser
export const isServer = () => typeof window === "undefined";
