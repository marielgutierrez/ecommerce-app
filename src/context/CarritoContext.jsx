import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe ser usado dentro de un CarritoProvider");
  return context;
};

const CLAVE_STORAGE = "aura-carrito";

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
  }, [carrito]);

  const agregarACarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const incrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const obtenerCantidadTotal = () =>
    carrito.reduce((acum, item) => acum + item.cantidad, 0);

  const obtenerTotalPrecio = () =>
    carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);

  const value = {
    carrito,
    agregarACarrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerCantidadTotal,
    obtenerTotalPrecio,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
