import { useEffect, useState } from "react";
import "./App.css";
import { OddModeAnimation } from "./OddModeAnimation";
import { log } from "./utils";
import { useEnterOddMode, useIsInOddMode, useOddModeState } from "./queries";

function App() {
  const { data: current, isLoading } = useIsInOddMode();
  const { data: lastValue, mutate: setOddModeState } = useOddModeState();
  const { mutate: enterOddMode } = useEnterOddMode();

  // Demonstrate a modal dialog that's in the DOM
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (current !== lastValue) {
      if (current) {
        log("enter odd mode");
        setOddModeState(true);
        enterOddMode();
      } else {
        log("show modal");
        setShowModal(true);
        setOddModeState(false);
      }
    }
  }, [current]);

  if (isLoading) {
    return <div>Loading odd mode...</div>;
  }

  if (current === undefined) {
    return <div>error...</div>;
  }

  return (
    <>
      <OddModeAnimation oddMode={current ?? false} />
      <h1>Odd mode example</h1>
      <p>Odd mode is {current ? "ON" : "OFF"}</p>
      <p>Changed in last API call: {(current !== lastValue).toString()}</p>
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
