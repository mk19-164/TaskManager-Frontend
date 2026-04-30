import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Completá todos los campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("auth-changed"));

      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2>Bienvenido de nuevo</h2>
        <p>Iniciá sesión para acceder a tu panel y seguir gestionando tus tareas.</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="tuemail@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Ingresá tu contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p style={{ marginTop: "18px", marginBottom: 0 }}>
          ¿No tenés cuenta? <Link to="/register">Creala acá</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;