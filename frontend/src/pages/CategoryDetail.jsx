import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { deleteCategory, getCategoryById } from "../services/categoryService";
import { getTasks } from "../services/taskService";

function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryData, tasksData] = await Promise.all([
          getCategoryById(id),
          getTasks(),
        ]);

        setCategory(categoryData);
        setTasks(tasksData.filter((task) => task.category?._id === id));
      } catch {
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Querés eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      navigate("/categories");
    } catch (error) {
      alert(error.response?.data?.message || "No se pudo eliminar la categoría.");
    }
  };

  if (loading) {
    return (
      <section className="auth-wrap">
        <div className="auth-card">
          <h2>Cargando categoría</h2>
          <p>Esperá un momento.</p>
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="auth-wrap">
        <div className="auth-card">
          <h2>Categoría no encontrada</h2>
          <p>No existe una categoría con ese identificador.</p>
          <Link to="/categories" className="btn primary">
            Volver a categorías
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        title="Detalle de categoría"
        description="Visualización completa de la categoría seleccionada."
        actions={
          <>
            <Link to={`/categories/${category._id}/edit`} className="btn primary">
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
          <h3 className="card-title">{category.name}</h3>
          <p className="card-text" style={{ marginTop: "10px" }}>
            {category.description}
          </p>
        </div>

        <div className="card">
          <div className="info-list">
            <div className="info-item">
              <span>Estado</span>
              <strong>{category.active ? "Activa" : "Inactiva"}</strong>
            </div>

            <div className="info-item">
              <span>Tareas asociadas</span>
              <strong>{tasks.length}</strong>
            </div>

            <div className="info-item">
              <span>Identificador</span>
              <strong>#{category._id}</strong>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "20px" }} className="card">
        <h3 className="card-title">Tareas de esta categoría</h3>

        {tasks.length === 0 ? (
          <div className="empty-state">No hay tareas asociadas a esta categoría.</div>
        ) : (
          <div className="info-list" style={{ marginTop: "16px" }}>
            {tasks.map((task) => (
              <div key={task._id} className="info-item">
                <span>{task.status}</span>
                <strong>{task.title}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryDetail;