import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Authentication/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./Admin/adminLogin/AdminLogin";
import DashBroand from "./Admin/dashbroand/src/main";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/test" element={<DashBroand />} />
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
