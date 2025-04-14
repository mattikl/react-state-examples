import { useEffect, useState } from "react";
import "./App.css";
import { useOddMode } from "./queries";
import { OddModeAnimation } from "./OddModeAnimation";
import { log } from "./utils";

function App() {
  const [{ isOddMode, oddModeChanged, isLoading, isError }, { enterOddMode }] = useOddMode();
  // Demonstrate a modal dialog that's in the DOM
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (oddModeChanged) {
      if (!isOddMode) {
        log("show modal");
        setShowModal(true);
      } else {
        enterOddMode();
      }
    }
  }, [enterOddMode, isOddMode, oddModeChanged]);

  if (isLoading) {
    return <div>Loading odd mode...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  return (
    <>
      <OddModeAnimation oddMode={isOddMode} />
      <h1>Odd mode example</h1>
      <p>Odd mode is {isOddMode ? "ON" : "OFF"}</p>
      <p>Changed in last API call: {oddModeChanged.toString()}</p>
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
