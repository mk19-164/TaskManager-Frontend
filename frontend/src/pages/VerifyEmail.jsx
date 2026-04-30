import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function VerifyEmail() {
  const { token } = useParams();
  const hasVerified = useRef(false);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Estamos verificando tu cuenta...");

  useEffect(() => {
    if (!token || hasVerified.current) return;

    hasVerified.current = true;

    const verifyAccount = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`);
        setStatus("success");
        setMessage(response.data.message || "Cuenta verificada correctamente.");
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "No se pudo verificar la cuenta.");
      }
    };

    verifyAccount();
  }, [token]);

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2>Verificación de correo</h2>
        <p>{message}</p>

        <div className="form-grid">
          {status === "loading" && (
            <button className="btn primary" type="button" disabled>
              Verificando...
            </button>
          )}

          {status === "success" && (
            <Link to="/login" className="btn primary">
              Ir a iniciar sesión
            </Link>
          )}

          {status === "error" && (
            <>
              <Link to="/register" className="btn primary">
                Volver a registrarme
              </Link>
              <Link to="/login" className="btn">
                Ir a iniciar sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default VerifyEmail;