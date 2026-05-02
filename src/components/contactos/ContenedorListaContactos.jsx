import { useState, useEffect } from 'react';
import ListaContactos from './ListaContactos';
import styles from './ContenedorListaContactos.module.css';

const ContenedorListaContactos = () => {

  const [contactos, setContactos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar la información del equipo');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setContactos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando equipo, por favor espere...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div>
      <h2 className={styles.colTitle}>¿Quiénes somos?</h2>
      <div>
        <ListaContactos contactos={contactos} />
      </div>
    </div>
  )
}

export default ContenedorListaContactos;
