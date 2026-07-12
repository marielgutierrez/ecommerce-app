import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FiShoppingCart, FiMinus, FiPlus, FiArrowLeft, FiStar } from "react-icons/fi";
import { db, COLECCION_PRODUCTOS } from "../firebase/config";
import { useCart } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import styles from "./DetalleProducto.module.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarACarrito } = useCart();
  const { usuario, estaLogueado } = useAuth();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const [opiniones, setOpiniones] = useState([]);
  const [nuevaOpinion, setNuevaOpinion] = useState({ comentario: "", rating: 5 });
  const [enviandoOpinion, setEnviandoOpinion] = useState(false);

  useEffect(() => {
    let activo = true;
    (async () => {
      setCargando(true);
      try {
        const snap = await getDoc(doc(db, COLECCION_PRODUCTOS, id));
        if (!activo) return;
        if (snap.exists()) {
          setProducto({ id: snap.id, ...snap.data() });
        } else {
          setProducto(null);
        }
      } catch (e) {
        console.error(e);
        if (activo) setError("No se pudo cargar el producto.");
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, [id]);

  useEffect(() => {
    const consulta = query(
      collection(db, "opiniones"),
      where("productoId", "==", id)
    );
    const unsub = onSnapshot(consulta, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOpiniones(data);
    });
    return () => unsub();
  }, [id]);

  const handleAgregar = () => {
    agregarACarrito(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1800);
  };

  const enviarOpinion = async (e) => {
    e.preventDefault();
    if (!nuevaOpinion.comentario.trim()) return;
    setEnviandoOpinion(true);
    try {
      await addDoc(collection(db, "opiniones"), {
        productoId: id,
        clienteNombre: usuario?.nombre || usuario?.email?.split("@")[0] || "Anónimo",
        comentario: nuevaOpinion.comentario.trim(),
        rating: Number(nuevaOpinion.rating),
        fecha: serverTimestamp(),
      });
      setNuevaOpinion({ comentario: "", rating: 5 });
    } catch (err) {
      console.error(err);
    } finally {
      setEnviandoOpinion(false);
    }
  };

  if (cargando) {
    return (
      <div className={styles.centro}>
        <div className="spinner" />
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className={styles.centro}>
        <h2>{error || "Producto no encontrado"}</h2>
        <Link to="/productos" className="btn-primary">
          <FiArrowLeft /> Volver al catálogo
        </Link>
      </div>
    );
  }

  const sinStock = Number(producto.stock) <= 0;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{producto.nombre} · Aura Makeup</title>
        <meta name="description" content={producto.descripcion || producto.nombre} />
      </Helmet>

      <Link to="/productos" className={styles.volver}>
        <FiArrowLeft /> Volver al catálogo
      </Link>

      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} />
          ) : (
            <div className={styles.noImg}>Sin imagen</div>
          )}
        </div>

        <div className={styles.info}>
          {producto.categoria && (
            <span className={styles.categoria}>{producto.categoria}</span>
          )}
          <h1 className={styles.nombre}>{producto.nombre}</h1>
          <p className={styles.descripcion}>{producto.descripcion}</p>

          <div className={styles.precio}>
            <span className={styles.moneda}>ARS</span>
            ${Number(producto.precio).toLocaleString("es-AR")}
          </div>

          <p className={styles.stock}>
            {sinStock ? "Sin stock disponible" : `${producto.stock} unidades disponibles`}
          </p>

          {!sinStock && (
            <div className={styles.acciones}>
              <div className={styles.qtySelector}>
                <button
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  aria-label="Restar"
                >
                  <FiMinus />
                </button>
                <span>{cantidad}</span>
                <button
                  onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
                  aria-label="Sumar"
                >
                  <FiPlus />
                </button>
              </div>

              <button className={styles.btnCarrito} onClick={handleAgregar}>
                <FiShoppingCart /> {agregado ? "¡Agregado!" : "Añadir al carrito"}
              </button>
            </div>
          )}
        </div>
      </main>

      <section className={styles.opiniones}>
        <h2 className={styles.opinionesTitle}>Opiniones de la comunidad</h2>

        {estaLogueado ? (
          <form className={styles.opinionForm} onSubmit={enviarOpinion}>
            <textarea
              placeholder="Contanos qué te pareció este producto..."
              value={nuevaOpinion.comentario}
              onChange={(e) =>
                setNuevaOpinion((o) => ({ ...o, comentario: e.target.value }))
              }
              rows={3}
            />
            <div className={styles.opinionFormFooter}>
              <label>
                Calificación:
                <select
                  value={nuevaOpinion.rating}
                  onChange={(e) =>
                    setNuevaOpinion((o) => ({ ...o, rating: e.target.value }))
                  }
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} ★
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn-primary" disabled={enviandoOpinion}>
                {enviandoOpinion ? "Enviando..." : "Publicar opinión"}
              </button>
            </div>
          </form>
        ) : (
          <p className={styles.loginHint}>
            <Link to="/login">Iniciá sesión</Link> para dejar tu opinión.
          </p>
        )}

        {opiniones.length === 0 ? (
          <p className={styles.sinOpiniones}>Aún no hay reseñas para este producto.</p>
        ) : (
          <div className={styles.opinionesList}>
            {opiniones.map((op) => (
              <div key={op.id} className={styles.opinionCard}>
                <div className={styles.opinionHead}>
                  <strong>{op.clienteNombre}</strong>
                  <span className={styles.rating}>
                    {Array.from({ length: op.rating }).map((_, i) => (
                      <FiStar key={i} />
                    ))}
                  </span>
                </div>
                <p>{op.comentario}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DetalleProducto;
