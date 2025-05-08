import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoPage from "./pages/TodoPage"
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element = {<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todos"
            element={<PrivateRoute><TodoPage /></PrivateRoute>}
          />
          <Route path = "*" element = {<Navigate to = "/" />} />
         </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
