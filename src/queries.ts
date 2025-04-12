import { useMutation, useQuery } from "@tanstack/react-query";
import { apiIsOddity, getOddModeState, saveOddModeState } from "./api";
import { log, sleep } from "./utils";

/** Return whether odd mode is on and whether the state has changed */
export const useOddMode = () => {
  const enterMutation = useEnterOddMode();

  return useQuery({
    queryKey: ["useIsInOddMode"],
    queryFn: async () => {
      const oddMode = await apiIsOddity();
      const last = await getOddModeState();
      const changed  = oddMode !== last;
      if (changed) {
        if (oddMode) {
          enterMutation.mutate(); // Run in background
        }
        await saveOddModeState(oddMode);
      }

      return { oddMode, changed };
    },
    refetchInterval: 1000 * 5,
  });
};

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