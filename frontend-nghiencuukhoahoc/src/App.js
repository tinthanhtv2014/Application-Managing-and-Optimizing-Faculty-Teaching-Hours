import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Authentication/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import LoginAdmin from "../src/Admin/dashbroand/src/pages/login.jsx";

import PrivateRoute from "./Authentication/PrivateRoute.js";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/admin/*" element={<PrivateRoute />} />
          <Route path="/giang-vien/*" element={<PrivateRoute />} />
          <Route path="/truong-bm/*" element={<PrivateRoute />} />
          <Route path="/truongkhoa/*" element={<PrivateRoute />} />
          <Route path="/giang-vien-ngoai-truong/*" element={<PrivateRoute />} />
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
