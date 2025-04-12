import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiIsOddity, getOddModeState, saveOddModeState } from "./api";
import { log, sleep } from "./utils";

export const useIsInOddMode = () => {
  return useQuery({
    queryKey: ["useIsInOddMode"],
    queryFn: apiIsOddity,
    refetchInterval: 1000 * 5,
  });
};

export const useOddModeState = () => {
  const queryClient = useQueryClient();
  const query = useQuery<boolean>({
    queryKey: ["useOddModeState"],
    queryFn: getOddModeState,
  });

  const { mutate } = useMutation({
    mutationFn: saveOddModeState,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["useOddModeState"],
      });
    },
  });

  return { ...query, mutate };
}

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