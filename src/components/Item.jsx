import styles from './ItemListContainer.module.css'
import { useState } from 'react';

const Item = ({ id, nombre, precio, stock, imagen }) => {

  const [cantidad, setCantidad] = useState(0);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1)
    }
  }

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1)
    }
  }

  const agregarAlCarrito = () => {
    alert(`¡Agregaste ${cantidad} unidades de ${nombre}  al carrito.`);
  }

  return (

        <li key={id} className={styles.item} >
          <h2>{nombre}</h2>
          <img src={imagen} alt={nombre} width="150" />
          <p>Precio: ${precio}</p>
          <p>Stock disponible: {stock}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
            <button onClick={decrementar}>-</button>
            <p style={{ margin: '0 10px' }}>{cantidad}</p>
            <button onClick={incrementar}>+</button>
          </div>
          
          <button onClick={agregarAlCarrito}>Agregar al Carrito</button>
        </li>
  )
}

export default Item
