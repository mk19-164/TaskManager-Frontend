import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { createCategory, getCategoryById, updateCategory } from "../services/categoryService";

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });

  const [loading, setLoading] = useState(isEditMode);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadCategory = async () => {
      if (!isEditMode) return;

      try {
        const category = await getCategoryById(id);
        setFormData({
          name: category.name,
          description: category.description,
          active: category.active,
        });
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Completá el nombre y la descripción.");
      return;
    }

    try {
      if (isEditMode) {
        await updateCategory(id, formData);
      } else {
        await createCategory(formData);
      }

      navigate("/categories");
    } catch (error) {
      alert(error.response?.data?.message || "No se pudo guardar la categoría.");
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

  if (notFound) {
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
        title={isEditMode ? "Editar categoría" : "Nueva categoría"}
        description={
          isEditMode
            ? "Modificá los datos de la categoría seleccionada."
            : "Completá los datos para registrar una categoría."
        }
      />

      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Ej: Universidad"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Detalle de la categoría"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Estado</label>
            <select
              name="active"
              className="form-control"
              value={String(formData.active)}
              onChange={handleChange}
            >
              <option value="true">Activa</option>
              <option value="false">Inactiva</option>
            </select>
          </div>

          <div className="page-actions">
            <button type="submit" className="btn primary">
              {isEditMode ? "Guardar cambios" : "Guardar categoría"}
            </button>
            <Link to="/categories" className="btn">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default CategoryForm;