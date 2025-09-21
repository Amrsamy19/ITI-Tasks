import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import BookDetails from "./components/BookDetails";
import Navigation from "./components/Navigation";
import Users from "./components/Users";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navigation
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
                <Dashboard
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navigation
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
                <BookDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navigation
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
                <Users user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
