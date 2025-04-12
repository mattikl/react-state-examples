import { log, sleep } from "./utils";

/**
 * Simulate API call that return whether a given state is active.
 * @returns {Promise<boolean>} - Is current minute odd
 */
export const apiIsOddity = async (): Promise<boolean> => {
  await sleep(1000); // Sleep for 1 second to simulate slow API
  const currentMinute = new Date().getMinutes();
  const isOdd = currentMinute % 2 !== 0;
  log(`reading odd state from API: ${isOdd}`);
  return isOdd;
};

/**
 * Simulate an async state setter.
 */
export const saveOddModeState = async (isOdd: boolean): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Sleep for 100 ms to simulate slow API
  localStorage.setItem("isOdd", JSON.stringify(isOdd));
  log(`saved odd state: ${isOdd}`);
};

/**
 * Simulate an async state getter.
 */
export const getOddModeState = async (): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Sleep for 100 ms to simulate slow API
  const isOdd = localStorage.getItem("isOdd");
  log(` get odd state: ${isOdd}`);
  return isOdd === "true";
};
