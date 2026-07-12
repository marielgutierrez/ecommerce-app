import { useState, useMemo, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./ItemListContainer.module.css";
import ItemList from "./ItemList";
import { useProductos } from "../context/ProductosContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

const POR_PAGINA = 6;

function ItemListContainer({ Mensaje = "Nuestros productos" }) {
  const { productos, cargando, error } = useProductos();
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter(
      (p) =>
        p.nombre?.toLowerCase().includes(q) ||
        p.categoria?.toLowerCase().includes(q)
    );
  }, [productos, busqueda]);

  useEffect(() => {
    setPagina(1);
  }, [busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice(
    (paginaSegura - 1) * POR_PAGINA,
    paginaSegura * POR_PAGINA
  );

  useScrollReveal([visibles]);

  return (
    <section className={styles.contenedor}>
      <header className={styles.head}>
        <p className="section-label">Catálogo</p>
        <h1 className="section-title">{Mensaje}</h1>

        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Buscar por nombre o categoría..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>
      </header>

      {cargando ? (
        <div className={styles.centro}>
          <div className="spinner" />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className={styles.centro}>
          <p className={styles.error}>{error}</p>
        </div>
      ) : filtrados.length === 0 ? (
        <div className={styles.centro}>
          <p className={styles.vacio}>
            {productos.length === 0
              ? "Todavía no hay productos cargados."
              : `No encontramos resultados para “${busqueda}”.`}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            <ItemList productos={visibles} />
          </div>

          {totalPaginas > 1 && (
            <nav className={styles.paginador} aria-label="Paginación">
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={paginaSegura === 1}
              >
                ← Anterior
              </button>
              <ul className={styles.paginas}>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <button
                      className={n === paginaSegura ? styles.activa : ""}
                      onClick={() => setPagina(n)}
                    >
                      {n}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={paginaSegura === totalPaginas}
              >
                Siguiente →
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}

export default ItemListContainer;
