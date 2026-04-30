import { NavLink } from "react-router-dom";

function Sidebar() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
          Inicio
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
          Tareas
        </NavLink>
        <NavLink to="/tasks/new" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
          Nueva tarea
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
          Categorías
        </NavLink>
        <NavLink to="/categories/new" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
          Nueva categoría
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;