import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import ChatWidget from "./pages/ChatWidget";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <Routes>
      {/* Public routes (no nav) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />

      {/* Routes WITH BottomNav */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatWidget />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
