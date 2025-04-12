# React State Examples

Demonstrate what can go wrong when reacting to state changed read from an API.

Branches:

* `main` contains a working example
* [useeffect-mutation](https://github.com/mattikl/react-state-examples/tree/useeffect-mutation) demonstrate what can happen if we call the mutation from components `useEffect`
* [two-queries](https://github.com/mattikl/react-state-examples/tree/two-queries) demonstrates the maintaining state in a separate query (a working example so far)
* [llm](https://github.com/mattikl/react-state-examples/tree/llm) is an LLM generated solution from a well-crafted prompt below (contains many bugs)

## Prompt for LLMs

We are creating a small React app for demonstration purposes with Vite, TypeScript and Tanstack Query.

We have `api.ts` which contains the following definitions to simulate asynchronous API calls (import `log` logs to browser console with a timestamp, `sleep` sleeps for specified milliseconds):

```ts
import { log, sleep } from "./utils";

/**
 * Simulate API call that return whether the odd mode is active.
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
```

Our job is to create an app that periodically calls `apiIsOddity` with a 5 second interval and does the following:

- With TanStack Query, create a query or queries which returns the current value of the odd mode and information about state changes
- Display whether odd mode is ON or OFF
- When odd mode starts, run mutation `useEnterOddMode` once. You can run the mutation from the query or from `useEffect`. Do what you think leads to clear logic in the code.
- When odd mode ends, display a modal dialog with text "Odd mode ended" and on OK button that the user needs to click to continue using the app. Do not use `window.alert` but make a well-stylished modal in the DOM.

The definition for `useEnterOddMode` is this:

```ts
/** Mutation that should be run when entering odd mode */
export const useEnterOddMode = () => {
  return useMutation({
    mutationFn: async () => {
      log("entering odd mode...");
      await sleep(1000);
      log("this setup is gonna take...");
      await sleep(1000);
      log("a while...");
      await sleep(2000);
      // window.alert("Odd mode is on!"); // We can make API calls from mutations but not modify the DOM
      await sleep(2000);
      log("done!");
    },
  });
}
```

The state should be persisted with `saveOddModeState` to be consistent after page reload etc. Do not use `localStorage` directly, because this is an example how to use async getter/setter.

On top of the UI, display a simple SVG animation with a black circle and a clock arm with the following logic:

- when odd mode is off, it should rotate clockwise
- when odd mode is on, it should rotate counterclockwise and have a light red background

The UI should also contain debug information whether last value read from the API was changed or not.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
