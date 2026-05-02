import { useState, useEffect } from 'react';
import styles from './Productos.module.css';

function Productos({ Mensaje }) {

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar la información de los productos');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando productos, por favor espere...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className={styles.contenedor}>
      <h1>{Mensaje}</h1>
      <ul className={styles.lista}>
        {productos.map((producto) => (
          <li key={producto.id} className={styles.item}>
            <h2>{producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} width="150" />
            <p>Precio: ${producto.precio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Productos;