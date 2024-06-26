import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Authentication/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import LoginAdmin from "../src/Admin/dashbroand/src/pages/login.jsx";

import DashBroandAdmin from "./Admin/dashbroand/src/main";
import DashboardTruongBoMon from "./TruongBoMon/dashbroand/src/main.jsx";
import DashboardGiangVien from "./GiangVien/dashbroand/src/main.jsx";
import DashboardTruongKhoa from "./TruongKhoa/dashbroand/src/main.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/admin" element={<DashBroandAdmin />} />
          <Route path="/giang-vien" element={<DashboardGiangVien />} />
          <Route path="/truong-bm" element={<DashboardTruongBoMon />} />
          <Route path="/truongkhoa" element={<DashboardTruongKhoa />} />
          {/* <Route path="/" element={<TruongKhoaLogin />} /> */}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
