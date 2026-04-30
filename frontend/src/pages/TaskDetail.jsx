import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { deleteTask, getTaskById } from "../services/taskService";

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

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch {
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Querés eliminar esta tarea?");
    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      navigate("/tasks");
    } catch (error) {
      alert(error.response?.data?.message || "No se pudo eliminar la tarea.");
    }
  };

  if (loading) {
    return (
      <section className="auth-wrap">
        <div className="auth-card">
          <h2>Cargando tarea</h2>
          <p>Esperá un momento.</p>
        </div>
      </section>
    );
  }

  if (!task) {
    return (
      <section className="auth-wrap">
        <div className="auth-card">
          <h2>Tarea no encontrada</h2>
          <p>No existe una tarea con ese identificador.</p>
          <Link to="/tasks" className="btn primary">
            Volver a tareas
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        title="Detalle de tarea"
        description="Visualización completa de la tarea seleccionada."
        actions={
          <>
            <Link to={`/tasks/${task._id}/edit`} className="btn primary">
              Editar
            </Link>
            <button type="button" className="btn danger" onClick={handleDelete}>
              Eliminar
            </button>
          </>
        }
      />

      <section className="detail-grid">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <h3 className="card-title" style={{ marginBottom: 0 }}>
              {task.title}
            </h3>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className={getPriorityClass(task.priority)}>{task.priority}</span>
              <span className={getStatusClass(task.status)}>{task.status}</span>
            </div>
          </div>

          <p className="card-text" style={{ fontSize: "1rem", lineHeight: "1.8" }}>
            {task.description}
          </p>
        </div>

        <div className="card">
          <div className="info-list">
            <div className="info-item">
              <span>Categoría</span>
              <strong>{task.category?.name || "-"}</strong>
            </div>

            <div className="info-item">
              <span>Prioridad</span>
              <strong>{task.priority}</strong>
            </div>

            <div className="info-item">
              <span>Estado</span>
              <strong>{task.status}</strong>
            </div>

            <div className="info-item">
              <span>Identificador</span>
              <strong>#{task._id}</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TaskDetail;