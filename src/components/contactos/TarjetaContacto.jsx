import styles from './TarjetaContacto.module.css';

const TarjetaContacto = ({ nombre, email, rol, foto }) => {
    return (
        <div className={styles.item}>
            <h2>{nombre}</h2>
            <p>{rol}</p>
            <p>{email}</p>
            <img src={foto} alt={nombre} width="200" />

        </div>
    );
};
export default TarjetaContacto;