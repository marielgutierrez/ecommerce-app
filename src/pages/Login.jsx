import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

const mensajeError = (code) => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email o contraseña incorrectos.";
    case "auth/invalid-email":
      return "El email no es válido.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Probá más tarde.";
    default:
      return "No se pudo iniciar sesión. Intentá nuevamente.";
  }
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(form);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(mensajeError(err.code));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Helmet><title>Ingresar · Aura Makeup</title></Helmet>
      <div className={styles.glow} />
      <div className={styles.card}>
        <p className="section-label">Bienvenid@ de nuevo</p>
        <h1 className={styles.title}>Iniciar <em>sesión</em></h1>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.field}>
            <FiMail />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
          </label>
          <label className={styles.field}>
            <FiLock />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={onChange}
              required
            />
          </label>

          <button type="submit" className="btn-primary" disabled={cargando}>
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className={styles.switch}>
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
