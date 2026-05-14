import styles from './Footer.module.css'

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
                        <strong>Aura Makeup</strong>
                    </div>
                    <p className={styles.tagline}>Tu destino para cosméticos de alta calidad y belleza auténtica.</p>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Comprar</h4>
                    <ul className={styles.linkList}>
                    </ul>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Ayuda</h4>
                    <ul className={styles.linkList}>
                    </ul>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>News</h4>
                    <p className={styles.newsletterText}>Siguenos en nuestras redes</p>
                </div>
            </div>
            <br />
            <br />
            <p className={styles.copyright}>&copy; 2026 - Aura Makeup e-commerce</p>
        </footer>
    )
}

export default Footer
