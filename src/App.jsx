import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CanvasBoard from "./pages/CanvasBoard";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <nav
        style={{
          padding: "1rem",
          background: "#333",
          color: "white",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/canvas" style={{ color: "white", textDecoration: "none" }}>
          Canvas
        </Link>
      </nav>

      {/* Pages */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/canvas" element={<CanvasBoard />} />
        </Routes>
      </div>
    </div>
  );
}
