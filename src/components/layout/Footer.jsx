import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            Aura<span>Makeup</span>
          </span>
          <p className={styles.tagline}>
            Tu destino para cosméticos de alta calidad y belleza auténtica.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Comprar</h4>
          <ul className={styles.linkList}>
            <li><Link to="/productos">Todos los productos</Link></li>
            <li><Link to="/productos">Rostro</Link></li>
            <li><Link to="/productos">Labios</Link></li>
            <li><Link to="/productos">Ojos</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Ayuda</h4>
          <ul className={styles.linkList}>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Newsletter</h4>
          <p className={styles.newsletterText}>
            Suscribite y recibí novedades y promociones exclusivas.
          </p>
          <form
            className={styles.newsletterForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Tu email" aria-label="Email" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Aura Makeup — E-commerce. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
