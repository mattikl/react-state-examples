export const OddModeAnimation = ({ oddMode }: { oddMode: boolean }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: `${
          !oddMode ? "roll-forward" : "roll-backward"
        } 2s linear infinite`,
      }}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        fill={oddMode ? "#ffcccc" : "transparent"}
        strokeWidth="4"
      />

      <line x1="50" y1="50" x2="50" y2="10" stroke="black" strokeWidth="4" />
    </svg>
  );
};
