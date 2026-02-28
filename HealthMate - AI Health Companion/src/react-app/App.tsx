import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import ChatPage from "@/react-app/pages/Chat";
import ReportsPage from "@/react-app/pages/Reports";
import DoctorsPage from "@/react-app/pages/Doctors";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
      </Routes>
    </Router>
  );
}
