import { useMutation, useQuery } from "@tanstack/react-query";
import { apiIsOddity, getOddModeState, saveOddModeState } from "./api";
import { log, sleep } from "./utils";
import { useCallback } from "react";

type OddModeState = {
  isOddMode: boolean;
  oddModeChanged: boolean;
  isLoading: boolean;
  isError: boolean;
};

type OddModeMutation = {
  enterOddMode: () => void;
};

export function useOddMode(): [
  OddModeState,
  OddModeMutation
] {
  /** Return whether odd mode is on and whether the state has changed */
  const { data, isLoading, isError } = useQuery({
      queryKey: ["useIsInOddMode"],
      queryFn: async () => {
        const oddMode = await apiIsOddity();
        const last = await getOddModeState();
        const changed  = oddMode !== last;
        if (changed) {
          await saveOddModeState(oddMode);
        }

        return { isOddMode: oddMode, oddModeChanged: changed };
      },
      refetchInterval: 1000 * 5,
    });
  

  /** Mutation that should be run when entering odd mode */
  const enterOddMode = useMutation({
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

  /** Memoize the mutation function to avoid re-renders. The function itself
   * does not change so it can be memoized with an empty dependency array.
   */
  const memoedEntranceFn = useCallback(enterOddMode.mutate, []);
  return [
    {
      isOddMode: data?.isOddMode || false,
      oddModeChanged: data?.oddModeChanged || false,
      isLoading,
      isError,
    },
    {
      enterOddMode: memoedEntranceFn,
    }
  ]
}
