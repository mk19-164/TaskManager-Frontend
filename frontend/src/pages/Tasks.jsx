import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getTasks } from "../services/taskService";

function getPriorityClass(priority) {
  if (priority === "Alta") return "badge high";
  if (priority === "Media") return "badge medium";
  return "badge low";
}

function getStatusClass(status) {
  if (status === "Completada") return "badge done";
  if (status === "En progreso") return "badge medium";
  return "badge pending";
}

function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        alert(error.response?.data?.message || "No se pudieron cargar las tareas.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <PageHeader
          title="Tareas"
          description="Gestioná todas tus tareas desde un solo lugar."
        />
        <div className="card">
          <div className="empty-state">Cargando tareas...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Tareas"
        description="Gestioná todas tus tareas desde un solo lugar."
        actions={
          <Link to="/tasks/new" className="btn primary">
            Nueva tarea
          </Link>
        }
      />

      <section className="grid-cards">
        {tasks.length === 0 ? (
          <div className="card">
            <div className="empty-state">No hay tareas cargadas.</div>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="card" style={{ gridColumn: "span 6" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  marginBottom: "18px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h3 className="card-title" style={{ marginBottom: "10px" }}>
                    {task.title}
                  </h3>
                  <p className="card-text">{task.description}</p>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span className={getPriorityClass(task.priority)}>{task.priority}</span>
                  <span className={getStatusClass(task.status)}>{task.status}</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginTop: "18px",
                }}
              >
                <p className="card-text" style={{ margin: 0 }}>
                  Categoría: <strong style={{ color: "#f5f7fb" }}>{task.category?.name || "-"}</strong>
                </p>

                <div className="page-actions" style={{ margin: 0 }}>
                  <Link to={`/tasks/${task._id}`} className="btn">
                    Ver detalle
                  </Link>
                  <Link to={`/tasks/${task._id}/edit`} className="btn primary">
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Tasks;