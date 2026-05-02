import styles from './Home.module.css'

const Home = () => {
    return (
    <div className={styles.banner}>
        <div className={styles.overlay}>
            <h2>Bienvenidos a Disquería POP</h2>
            <p>Vinilos y CDs de tus artistas favoritos</p>
        </div>
    </div>
    )
}

export default Home