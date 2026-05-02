import styles from './Header.module.css'
import logo from '/images/logo/logo1.png';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
    return (
    <header className={styles.header}>
        <div className={styles.container}>

            <div className={styles.logo}>
            <img src={logo} alt="POP" width="180px" height="50px" />
            </div>

            <nav className={styles.nav}>
            <a href="#">Inicio</a>
            <a href="#">Vinilos</a>
            <a href="#">CDs</a>
            <a href="#">Cassettes</a>
            <a href="#">Ofertas</a>
            </nav>

            <div className={styles.actions}>
            <button className={styles.cartBtn}>
                <ShoppingCart size={22} />
            </button>
            </div>

        </div>
    </header>
    )
}

export default Header