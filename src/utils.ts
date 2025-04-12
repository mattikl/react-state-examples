export const log = (message: string) => {
  console.log(`${new Date().toISOString()}: ${message}`);
};
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
