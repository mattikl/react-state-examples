import { useEffect, useState } from "react";
import "./App.css";
import { useOddMode } from "./queries";
import { OddModeAnimation } from "./OddModeAnimation";

function App() {
  const { data, isLoading } = useOddMode();
  // Demonstrate a modal dialog that's in the DOM
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data?.changed && !data.oddMode) {
      setShowModal(true);
    }
  }, [data]);

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
