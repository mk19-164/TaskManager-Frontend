import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      setIsLogged(Boolean(token));

      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserName(parsedUser.name || "Usuario");
        } catch {
          setUserName("Usuario");
        }
      } else {
        setUserName("");
      }
    };

    syncAuthState();

    window.addEventListener("storage", syncAuthState);

    const interval = setInterval(syncAuthState, 300);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    setUserName("");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <div
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="TaskManager logo"
            style={{
              width: "28px",
              height: "28px",
              objectFit: "contain",
              display: "block",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        <div className="brand-text">
          <h1>TaskManager</h1>
          <p>Gestión moderna de tareas</p>
        </div>
      </Link>

      <div className="topbar-actions">
        {isLogged ? (
          <div
            ref={dropdownRef}
            style={{
              position: "relative",
            }}
          >
            <button
              type="button"
              className="topbar-button"
              onClick={() => setMenuOpen((prev) => !prev)}
              style={{
                gap: "10px",
                paddingRight: "14px",
              }}
            >
              <span>{userName}</span>
              <span
                style={{
                  display: "inline-block",
                  transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.2s ease",
                  fontSize: "12px",
                }}
              >
                ▼
              </span>
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "54px",
                  right: 0,
                  minWidth: "190px",
                  background: "rgba(18, 26, 47, 0.98)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  boxShadow: "0 20px 45px rgba(0, 0, 0, 0.35)",
                  padding: "8px",
                  backdropFilter: "blur(18px)",
                  zIndex: 100,
                }}
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    minHeight: "42px",
                    border: "none",
                    borderRadius: "12px",
                    background: "transparent",
                    color: "#f5f7fb",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "0 12px",
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="topbar-button">
              Iniciar sesión
            </Link>
            <Link to="/register" className="topbar-button primary">
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;