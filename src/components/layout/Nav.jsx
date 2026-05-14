import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import styles from './Nav.module.css';
import logo from '/images/logo/aura-logo.png';

const Nav = () => {
    return (
        <nav className={styles.navContainer}>
        
        <div className={styles.logo}>
        <img src={logo} alt="Aura Makeup" width="140px" height="40px"/>
        </div>
        <ul className={styles.navList}>
            <li>
            <Link to="/" className={styles.navLink}>
            Inicio
            </Link>
            </li>
            <li>
            <Link to="/productos" className={styles.navLink}>
                Productos
            </Link>
            </li>
            <li>
            <Link to="/contacto" className={styles.navLink}>
                Contacto
            </Link>
            </li>
        </ul>
            <div className={styles.actions}>
            <Link to="/carrito" className={styles.cartBtn}>
            <ShoppingCart size={22} />
            </Link>
            </div>
        </nav>
    );
}

export default Nav;