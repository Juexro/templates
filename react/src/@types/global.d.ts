declare module 'uuid/*';

declare function parseInt(str: string | number, radix?: number): number { }

declare function setTimeout(handler: () => void, duration?: number): number {}
declare function setInterval(handler: () => void, duration?: number): number {}