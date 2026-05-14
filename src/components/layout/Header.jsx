import styles from './Header.module.css'
import Nav from './Nav';
import logo from '/images/logo/logo1.png';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
    return (
    <header className={styles.header}>
        <Nav />
    </header>
    )
}

export default Header