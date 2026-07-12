import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

const mensajeError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con ese email.";
    case "auth/invalid-email":
      return "El email no es válido.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    default:
      return "No se pudo crear la cuenta. Intentá nuevamente.";
  }
};

const Registro = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.nombre.trim().length < 2) {
      return setError("Ingresá tu nombre.");
    }
    if (form.password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres.");
    }

    setCargando(true);
    try {
      await registrar(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(mensajeError(err.code));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Helmet><title>Crear cuenta · Aura Makeup</title></Helmet>
      <div className={styles.glow} />
      <div className={styles.card}>
        <p className="section-label">Sumate a Aura</p>
        <h1 className={styles.title}>Crear <em>cuenta</em></h1>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.field}>
            <FiUser />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={onChange}
              required
            />
          </label>
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
              placeholder="Contraseña (mín. 6 caracteres)"
              value={form.password}
              onChange={onChange}
              required
            />
          </label>

          <button type="submit" className="btn-primary" disabled={cargando}>
            {cargando ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className={styles.switch}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
