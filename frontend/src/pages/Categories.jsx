import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { deleteCategory, getCategories } from "../services/categoryService";
import { getTasks } from "../services/taskService";

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [categoriesData, tasksData] = await Promise.all([getCategories(), getTasks()]);
      setCategories(categoriesData);
      setTasks(tasksData);
    } catch (error) {
      alert(error.response?.data?.message || "No se pudieron cargar las categorías.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Querés eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      await loadData();
    } catch (error) {
      alert(error.response?.data?.message || "No se pudo eliminar la categoría.");
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader
          title="Categorías"
          description="Administrá las categorías relacionadas a tus tareas."
        />
        <div className="card">
          <div className="empty-state">Cargando categorías...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Categorías"
        description="Administrá las categorías relacionadas a tus tareas."
        actions={
          <Link to="/categories/new" className="btn primary">
            Nueva categoría
          </Link>
        }
      />

      <section className="grid-cards">
        {categories.length === 0 ? (
          <div className="card">
            <div className="empty-state">No hay categorías cargadas.</div>
          </div>
        ) : (
          categories.map((category) => {
            const relatedTasks = tasks.filter((task) => task.category?._id === category._id).length;

            return (
              <div key={category._id} className="card" style={{ gridColumn: "span 4" }}>
                <h3 className="card-title">{category.name}</h3>
                <p className="card-text">{category.description}</p>
                <p className="card-text" style={{ marginTop: "14px" }}>
                  Estado: {category.active ? "Activa" : "Inactiva"}
                </p>
                <p className="card-text" style={{ marginTop: "8px" }}>
                  Tareas asociadas: {relatedTasks}
                </p>
                <div className="page-actions" style={{ marginTop: "18px" }}>
                  <Link to={`/categories/${category._id}`} className="btn">
                    Ver detalle
                  </Link>
                  <Link to={`/categories/${category._id}/edit`} className="btn">
                    Editar
                  </Link>
                  <button type="button" className="btn danger" onClick={() => handleDelete(category._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
}

export default Categories;