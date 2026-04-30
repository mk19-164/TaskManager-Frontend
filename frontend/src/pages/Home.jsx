import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { getTasks } from "../services/taskService";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      if (!token) return;

      try {
        const [tasksData, categoriesData] = await Promise.all([getTasks(), getCategories()]);
        setTasks(tasksData);
        setCategories(categoriesData);
      } catch {
        setTasks([]);
        setCategories([]);
      }
    };

    loadData();
  }, [token]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Completada").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pendiente").length;
  const activeCategories = categories.filter((category) => category.active).length;

  return (
    <section className="hero">
      <div className="hero-box">
        <h2>Organizá tus tareas con una interfaz oscura, moderna y clara.</h2>
        <p>
          TaskManager te permite visualizar tareas, prioridades, categorías y estados
          en un solo lugar. Está pensado para estudiantes, equipos y cualquier persona
          que necesite ordenar su trabajo diario.
        </p>
        <div className="page-actions">
          {token ? (
            <>
              <Link to="/dashboard" className="btn primary">
                Ir al dashboard
              </Link>
              <Link to="/tasks" className="btn">
                Ver tareas
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn primary">
                Empezar ahora
              </Link>
              <Link to="/login" className="btn">
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <strong>{token ? totalTasks : "-"}</strong>
          <span>Tareas registradas</span>
        </div>
        <div className="stat">
          <strong>{token ? activeCategories : "-"}</strong>
          <span>Categorías activas</span>
        </div>
        <div className="stat">
          <strong>{token ? completedTasks : "-"}</strong>
          <span>Tareas completadas</span>
        </div>
        <div className="stat">
          <strong>{token ? pendingTasks : "-"}</strong>
          <span>Tareas pendientes</span>
        </div>
      </div>
    </section>
  );
}

export default Home;