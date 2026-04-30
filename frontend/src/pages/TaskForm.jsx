import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { getCategories } from "../services/categoryService";
import { createTask, getTaskById, updateTask } from "../services/taskService";

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Alta",
    status: "Pendiente",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        if (isEditMode) {
          const task = await getTaskById(id);
          setFormData({
            title: task.title,
            description: task.description,
            category: task.category?._id || "",
            priority: task.priority,
            status: task.status,
          });
        } else {
          setFormData((prev) => ({
            ...prev,
            category: categoriesData[0]?._id || "",
          }));
        }
      } catch {
        if (isEditMode) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      alert("Completá el título, la descripción y la categoría.");
      return;
    }

    try {
      if (isEditMode) {
        await updateTask(id, formData);
      } else {
        await createTask(formData);
      }

      navigate("/tasks");
    } catch (error) {
      alert(error.response?.data?.message || "No se pudo guardar la tarea.");
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

  if (notFound) {
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
        title={isEditMode ? "Editar tarea" : "Nueva tarea"}
        description={
          isEditMode
            ? "Modificá los datos de la tarea seleccionada."
            : "Completá los datos para registrar una tarea."
        }
      />

      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Ej: Estudiar para parcial"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Detalle de la tarea"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.length === 0 ? (
                <option value="">No hay categorías</option>
              ) : (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Prioridad</label>
            <select
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>

          <div className="form-group">
            <label>Estado</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pendiente</option>
              <option>En progreso</option>
              <option>Completada</option>
            </select>
          </div>

          <div className="page-actions">
            <button type="submit" className="btn primary">
              {isEditMode ? "Guardar cambios" : "Guardar tarea"}
            </button>
            <Link to="/tasks" className="btn">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskForm;