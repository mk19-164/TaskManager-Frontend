import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import TaskForm from "./pages/TaskForm";
import TaskDetail from "./pages/TaskDetail";
import Categories from "./pages/Categories";
import CategoryForm from "./pages/CategoryForm";
import CategoryDetail from "./pages/CategoryDetail";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";

function App() {
  const [isLogged, setIsLogged] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const syncAuthState = () => {
      setIsLogged(Boolean(localStorage.getItem("token")));
    };

    syncAuthState();

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <div className={`app-body ${isLogged ? "with-sidebar" : "without-sidebar"}`}>
        {isLogged && <Sidebar />}
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks/new"
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks/:id"
              element={
                <ProtectedRoute>
                  <TaskDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks/:id/edit"
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories/new"
              element={
                <ProtectedRoute>
                  <CategoryForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories/:id"
              element={
                <ProtectedRoute>
                  <CategoryDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories/:id/edit"
              element={
                <ProtectedRoute>
                  <CategoryForm />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
