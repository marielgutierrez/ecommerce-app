import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import styles from "./Contacto.module.css";

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>Contacto · Aura Makeup</title>
        <meta name="description" content="Contactate con Aura Makeup." />
      </Helmet>

      <div className={styles.header}>
        <p className="section-label">Estamos para ayudarte</p>
        <h1 className="section-title">
          Ponete en <em>contacto</em>
        </h1>
      </div>

      <div className={styles.content}>
        <aside className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}><FiMapPin /></span>
            <div>
              <h4>Dirección</h4>
              <p>Av. Corrientes 1234, CABA, Argentina</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}><FiMail /></span>
            <div>
              <h4>Email</h4>
              <p>hola@auramakeup.com</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}><FiPhone /></span>
            <div>
              <h4>Teléfono</h4>
              <p>+54 11 5555-5555</p>
            </div>
          </div>
        </aside>

        <form className={styles.form} onSubmit={onSubmit}>
          {enviado && (
            <div className={styles.ok}>¡Gracias! Te responderemos a la brevedad.</div>
          )}
          <div className={styles.row}>
            <input
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={onChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
          <textarea
            name="mensaje"
            placeholder="Tu mensaje..."
            rows={5}
            value={form.mensaje}
            onChange={onChange}
            required
          />
          <button type="submit" className="btn-primary">
            <FiSend /> Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
