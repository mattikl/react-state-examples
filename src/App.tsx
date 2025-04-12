import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  apiIsOddity,
  getOddModeState,
  saveOddModeState,
} from "./api";
import { useEnterOddMode } from "./queries";
import Modal from "./Modal";
import Clock from "./Clock";

const POLL_INTERVAL = 5000;

export default function App() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [lastApiValue, setLastApiValue] = useState<boolean | null>(null);
  const [changed, setChanged] = useState(false);

  const {
    data: isOddFromStorage,
    isLoading: isLoadingStorage,
    refetch: refetchStorage,
  } = useQuery({
    queryKey: ["oddModeStorage"],
    queryFn: getOddModeState,
  });

  const {
    data: isOddFromApi,
    refetch: refetchApi,
  } = useQuery({
    queryKey: ["oddModeApi"],
    queryFn: apiIsOddity,
    refetchInterval: POLL_INTERVAL,
  });

  const saveStateMutation = useMutation({
    mutationFn: saveOddModeState,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["oddModeStorage"] }),
  });

  const { mutate: enterOddMode } = useEnterOddMode();

  useEffect(() => {
    if (isOddFromApi == null || isOddFromStorage == null) return;

    const hasChanged = isOddFromApi !== lastApiValue;
    setChanged(hasChanged);
    setLastApiValue(isOddFromApi);

    if (hasChanged) {
      saveStateMutation.mutate(isOddFromApi);

      if (isOddFromApi) {
        enterOddMode();
      } else {
        setShowModal(true);
      }
    }
  }, [isOddFromApi]);

  if (isLoadingStorage || isOddFromStorage == null) return <div>Loading...</div>;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center gap-4 ${isOddFromStorage ? "bg-red-100" : "bg-white"}`}>
      <Clock isOdd={isOddFromStorage} />
      <h1 className="text-2xl font-bold">
        Odd Mode is {isOddFromStorage ? "ON" : "OFF"}
      </h1>
      <p className="text-sm text-gray-600">
        Last API read was {changed ? "a change" : "unchanged"}
      </p>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-lg font-semibold mb-2">Odd mode ended</h2>
          <p className="mb-4">Click OK to continue using the app.</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowModal(false)}
          >
            OK
          </button>
        </Modal>
      )}
    </div>
  );
}
