import styles from './Footer.module.css'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import ContenedorListaContactos from '../contactos/ContenedorListaContactos';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ContenedorListaContactos />
            <br />
            <br />
            <div className={styles.container}>
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>◎</span>
                        <strong>POP</strong>
                    </div>
                    <p className={styles.tagline}>Tu tienda de música física desde 2005. Calidad y pasión por la música.</p>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialBtn} aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="#" className={styles.socialBtn} aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" className={styles.socialBtn} aria-label="Twitter">
                            <FaXTwitter />
                        </a>
                    </div>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Comprar</h4>
                    <ul className={styles.linkList}>
                        <li><a href="#">Vinilos</a></li>
                        <li><a href="#">CDs</a></li>
                        <li><a href="#">Cassettes</a></li>
                        <li><a href="#">Ofertas</a></li>
                    </ul>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Ayuda</h4>
                    <ul className={styles.linkList}>
                        <li><a href="#">Envíos</a></li>
                        <li><a href="#">Devoluciones</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Newsletter</h4>
                    <p className={styles.newsletterText}>Recibe nuestras últimas novedades</p>
                    <div className={styles.newsletterForm}>
                    <input type="email" placeholder="Tu email" className={styles.emailInput} /><button className={styles.subscribeBtn}>Suscribir</button>
                </div>
            </div>
        </div>
        <br />
        <br />
        <p className={styles.copyright}>&copy; 2026 - Disqueria POP e-commerce</p>
        </footer>
    )
}

export default Footer
