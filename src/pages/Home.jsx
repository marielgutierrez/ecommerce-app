import styles from './Home.module.css'
import { Link } from 'react-router-dom';


const Home = () => {
    return (
    <div className={styles.wrapper}>

        <div className={styles.banner}>
            <div className={styles.overlay}>
            <p className={styles.eyebrow}>Cosméticos de alta calidad</p>
            <h1 className={styles.titulo}>Bienvenidos a<br /><span>Aura Makeup</span></h1>
            <p className={styles.subtitulo}>Belleza auténtica, productos que transforman</p>
            <Link to="/productos" className={styles.cta}>Ver productos</Link>
            </div>
        </div>

        <div className={styles.features}>
            <div className={styles.feature}>
            <span className={styles.icon}>✦</span>
            <h3>Nacional e internacional</h3>
            <p>Las mejores marcas del mundo y lo mejor de Argentina</p>
            </div>
            <div className={styles.feature}>
            <span className={styles.icon}>✦</span>
            <h3>Calidad garantizada</h3>
            <p>Productos originales con certificación de calidad</p>
            </div>
            <div className={styles.feature}>
            <span className={styles.icon}>✦</span>
            <h3>Envío a todo el país</h3>
            <p>Recibí tu pedido donde estés en Argentina</p>
            </div>
        </div>

    </div>
    )
}

export default Home