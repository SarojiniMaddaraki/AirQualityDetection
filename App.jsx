import { useState } from "react";

function App() {
  const [pm10, setPm10] = useState("");
  const [no2, setNo2] = useState("");
  const [so2, setSo2] = useState("");
  const [o3, setO3] = useState("");
  const [co, setCo] = useState("");
  const [result, setResult] = useState(null);
  const [color, setColor] = useState("#000");
  const [category, setCategory] = useState("");

  const handlePredict = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pm10, no2, so2, o3, co }),
      });

      const data = await response.json();
      if (data.aqi) {
        const aqi = parseFloat(data.aqi);
        setResult(aqi);

        // Determine category, color, and emoji
        if (aqi <= 50) {
          setCategory("Good 🌿");
          setColor("#2ecc71");
        } else if (aqi <= 100) {
          setCategory("Moderate ⚠️");
          setColor("#f1c40f");
        } else if (aqi <= 150) {
          setCategory("Unhealthy for Sensitive Groups 🍊");
          setColor("#e67e22");
        } else if (aqi <= 200) {
          setCategory("Unhealthy 🔴");
          setColor("#e74c3c");
        } else if (aqi <= 300) {
          setCategory("Very Unhealthy 🟣");
          setColor("#8e44ad");
        } else {
          setCategory("Hazardous 🛑");
          setColor("#800000");
        }
      } else {
        setResult(null);
        setCategory(`Error: ${data.error}`);
        setColor("#000");
      }
    } catch (err) {
      setResult(null);
      setCategory("Error connecting to backend");
      setColor("#000");
    }
  };

  const inputStyle = {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      background: "linear-gradient(135deg, #81ecec, #74b9ff)",
    }}>
      <div style={{
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}>
        <h1 style={{ color: "#333", marginBottom: "30px" }}>🌫️ AQI Predictor</h1>
        <input type="number" placeholder="PM10" value={pm10} onChange={e => setPm10(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="NO2" value={no2} onChange={e => setNo2(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="SO2" value={so2} onChange={e => setSo2(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="O3" value={o3} onChange={e => setO3(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="CO" value={co} onChange={e => setCo(e.target.value)} style={inputStyle} />
        <button
          style={buttonStyle}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#45a049"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#4CAF50"}
          onClick={handlePredict}
        >
          Predict AQI
        </button>
        {result !== null && (
          <div style={{ marginTop: "20px", color, fontSize: "20px", fontWeight: "600" }}>
            Predicted AQI: {result} <br />
            Category: {category}
          </div>
        )}
        {result === null && category.startsWith("Error") && (
          <div style={{ marginTop: "20px", color: "#e74c3c", fontWeight: "600" }}>{category}</div>
        )}
      </div>
    </div>
  );
}

export default App;
