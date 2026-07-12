import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db, COLECCION_PRODUCTOS } from "../firebase/config";

export const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context)
    throw new Error("useProductos debe usarse dentro de un ProductosProvider");
  return context;
};

const PRODUCTOS_EJEMPLO = [
  {
    nombre: "Base Fit Me - Maybelline",
    precio: 18000,
    stock: 20,
    categoria: "Rostro",
    imagen: "/images/products/base-maybelline.jpg",
    descripcion:
      "Base líquida de cobertura media con acabado natural mate. Se adapta al tono y la textura de tu piel para un look impecable todo el día.",
  },
  {
    nombre: "Labial Rojo - Revlon",
    precio: 12000,
    stock: 15,
    categoria: "Labios",
    imagen: "/images/products/labial-revlon.jpg",
    descripcion:
      "Labial cremoso de larga duración en un rojo clásico intenso. Hidrata mientras aporta color vibrante y luminoso.",
  },
  {
    nombre: "Paleta Naked - Urban Decay",
    precio: 45000,
    stock: 5,
    categoria: "Ojos",
    imagen: "/images/products/paleta-naked.jpg",
    descripcion:
      "Paleta de 12 sombras en tonos neutros y cálidos, entre mates y satinados. Altamente pigmentada y fácil de difuminar.",
  },
  {
    nombre: "Iluminador - Fenty Beauty",
    precio: 42000,
    stock: 8,
    categoria: "Rostro",
    imagen: "/images/products/iluminador-fenty.jpg",
    descripcion:
      "Iluminador en polvo de acabado luminoso y sedoso. Realza los puntos altos del rostro con un brillo natural.",
  },
  {
    nombre: "Labial Mate - Kova",
    precio: 7500,
    stock: 18,
    categoria: "Labios",
    imagen: "/images/products/labial-kova.jpg",
    descripcion:
      "Labial líquido de acabado mate aterciopelado y larga permanencia. Color intenso que no reseca los labios.",
  },
  {
    nombre: "Rubor Soft - Dapop",
    precio: 8500,
    stock: 20,
    categoria: "Rostro",
    imagen: "/images/products/rubor-dapop.jpg",
    descripcion:
      "Rubor en polvo de textura suave y buildable. Aporta un rubor natural y saludable a las mejillas.",
  },
];

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const consulta = query(
      collection(db, COLECCION_PRODUCTOS),
      orderBy("nombre")
    );

    const unsub = onSnapshot(
      consulta,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProductos(data);
        setCargando(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError("No se pudieron cargar los productos. Intentá nuevamente.");
        setCargando(false);
      }
    );

    return () => unsub();
  }, []);

  const agregarProducto = async (nuevo) => {
    await addDoc(collection(db, COLECCION_PRODUCTOS), {
      nombre: nuevo.nombre,
      precio: Number(nuevo.precio),
      stock: Number(nuevo.stock),
      categoria: nuevo.categoria || "General",
      imagen: nuevo.imagen || "",
      descripcion: nuevo.descripcion || "",
    });
  };

  const editarProducto = async (id, datos) => {
    await updateDoc(doc(db, COLECCION_PRODUCTOS, id), {
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
    });
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, COLECCION_PRODUCTOS, id));
  };

  const sembrarProductos = async () => {
    const batch = writeBatch(db);
    PRODUCTOS_EJEMPLO.forEach((p) => {
      const ref = doc(collection(db, COLECCION_PRODUCTOS));
      batch.set(ref, p);
    });
    await batch.commit();
  };

  const value = {
    productos,
    cargando,
    error,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    sembrarProductos,
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};
