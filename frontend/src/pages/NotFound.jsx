import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2>Página no encontrada</h2>
        <p>La ruta que intentaste abrir no existe.</p>
        <Link to="/" className="btn primary">Volver al inicio</Link>
      </div>
    </section>
  );
}

export default NotFound;