export default function Toast() {
  return (
    <div
      id="toast"
      style={{
        position: "fixed",
        fontSize: "20px",
        color: "#ffd966",
        zIndex: 1051,
        float: "right",
        overflow: "hidden",
        right: "10px",
        top: "70px",
        backgroundColor: "#FEFEFE",
        boxShadow: "-1px 1px 10px #9f9f9f",
        padding: "0 10px 0 10px",
        borderRadius: "3px",
        margin: "10px",
        display: "none",
      }}
    >
      <p>Loading Python libraries...</p>
    </div>
  );
}