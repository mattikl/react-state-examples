import { useEffect, useState } from "react";
import "./App.css";
import { useEnterOddMode, useOddMode } from "./queries";
import { OddModeAnimation } from "./OddModeAnimation";
import { log } from "./utils";

function App() {
  const { data, isLoading } = useOddMode();
  // Demonstrate a modal dialog that's in the DOM
  const [showModal, setShowModal] = useState(false);
  const enterMutation = useEnterOddMode();

  useEffect(() => {
    if (data?.changed) {
      if (!data.oddMode) {
        log("show modal");
        setShowModal(true);
      } else {
        enterMutation.mutate();
      }
    }
    // BUG: Adding `enterMutation` to the dependency array will cause the effect to
    // run every time `mutate` is called, because it changes the state of the mutation object.
    // It's run until `useOddMode` returns `changed` as false.
  }, [data, enterMutation]);

  if (isLoading) {
    return <div>Loading odd mode...</div>;
  }

  if (!data) {
    return <div>error...</div>;
  }

  const { oddMode, changed } = data;

  return (
    <>
      <OddModeAnimation oddMode={oddMode} />
      <h1>Odd mode example</h1>
      <p>Odd mode is {oddMode ? "ON" : "OFF"}</p>
      <p>Changed in last API call: {changed.toString()}</p>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Odd mode ended</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
