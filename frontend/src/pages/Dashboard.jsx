import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getCategories } from "../services/categoryService";
import { getTasks } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
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
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Completada").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pendiente").length;
  const inProgressTasks = tasks.filter((task) => task.status === "En progreso").length;
  const activeCategories = categories.filter((category) => category.active).length;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visualizá el estado general de tus tareas, prioridades y categorías."
      />

      <section className="kpi-grid">
        <div className="kpi-card">
          <span>Tareas activas</span>
          <strong>{totalTasks}</strong>
        </div>
        <div className="kpi-card">
          <span>Completadas</span>
          <strong>{completedTasks}</strong>
        </div>
        <div className="kpi-card">
          <span>Pendientes</span>
          <strong>{pendingTasks}</strong>
        </div>
        <div className="kpi-card">
          <span>En progreso</span>
          <strong>{inProgressTasks}</strong>
        </div>
      </section>

      <section className="grid-cards">
        <div className="card" style={{ gridColumn: "span 8" }}>
          <h3 className="card-title">Resumen general</h3>
          <p className="card-text">
            Actualmente tenés {totalTasks} tareas cargadas, {pendingTasks} pendientes, {inProgressTasks} en progreso y {completedTasks} completadas.
          </p>
        </div>

        <div className="card" style={{ gridColumn: "span 4" }}>
          <h3 className="card-title">Categorías activas</h3>
          <p className="card-text">
            {activeCategories} categorías disponibles: {categories.map((category) => category.name).join(", ")}.
          </p>
        </div>
      </section>
    </>
  );
}

export default Dashboard;