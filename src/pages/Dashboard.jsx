import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiDatabase } from "react-icons/fi";
import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import styles from "./Dashboard.module.css";

const FORM_VACIO = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "",
  imagen: "",
  descripcion: "",
};

// API key de ImgBB (reemplazar por la propia desde imgbb.com)
const IMGBB_KEY = "4bc89d90e5ba2ca799b0f1339650ce18";

const subirImagenImgBB = async (archivo) => {
  const datos = new FormData();
  datos.append("image", archivo);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: "POST",
    body: datos,
  });
  const json = await res.json();
  if (!json.success) throw new Error("Error al subir la imagen a ImgBB");
  return json.data.url;
};

const Dashboard = () => {
  const {
    productos,
    cargando,
    error,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    sembrarProductos,
  } = useProductos();
  const { usuario } = useAuth();

  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [aEliminar, setAEliminar] = useState(null); // producto a confirmar borrado
  const [imagenFile, setImagenFile] = useState(null); // archivo de imagen elegido

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onChangeImagen = (e) => setImagenFile(e.target.files[0] ?? null);

  const validar = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = "El nombre es obligatorio.";
    if (form.precio === "" || Number(form.precio) <= 0)
      errs.precio = "El precio debe ser mayor a 0.";
    if (form.stock === "" || Number(form.stock) < 0)
      errs.stock = "El stock no puede ser negativo.";
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const resetear = () => {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setErrores({});
    setImagenFile(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!validar()) return;

    setGuardando(true);
    try {
      let imagenUrl = form.imagen;
      if (imagenFile) {
        setMensaje("Subiendo imagen...");
        imagenUrl = await subirImagenImgBB(imagenFile);
      }
      const datos = { ...form, imagen: imagenUrl };

      if (editandoId) {
        await editarProducto(editandoId, datos);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await agregarProducto(datos);
        setMensaje("Producto agregado correctamente.");
      }
      resetear();
    } catch (err) {
      console.error(err);
      setMensaje("Ocurrió un error al guardar. Intentá nuevamente.");
    } finally {
      setGuardando(false);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  const empezarEdicion = (p) => {
    setEditandoId(p.id);
    setForm({
      nombre: p.nombre || "",
      precio: p.precio ?? "",
      stock: p.stock ?? "",
      categoria: p.categoria || "",
      imagen: p.imagen || "",
      descripcion: p.descripcion || "",
    });
    setErrores({});
    setImagenFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmarEliminar = async () => {
    if (!aEliminar) return;
    try {
      await eliminarProducto(aEliminar.id);
      setMensaje("Producto eliminado.");
    } catch (err) {
      console.error(err);
      setMensaje("No se pudo eliminar el producto.");
    } finally {
      setAEliminar(null);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  const sembrar = async () => {
    try {
      await sembrarProductos();
      setMensaje("Productos de ejemplo cargados.");
    } catch (err) {
      console.error(err);
      setMensaje("No se pudieron cargar los productos de ejemplo.");
    } finally {
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Helmet><title>Dashboard · Aura Makeup</title></Helmet>

      <header className={styles.head}>
        <div>
          <p className="section-label">Panel de administración</p>
          <h1 className="section-title">
            Gestión de <em>productos</em>
          </h1>
          <p className={styles.hola}>Hola, {usuario?.nombre || usuario?.email} 👋</p>
        </div>
        {productos.length === 0 && !cargando && (
          <button className="btn-ghost" onClick={sembrar}>
            <FiDatabase /> Cargar productos de ejemplo
          </button>
        )}
      </header>

      {mensaje && <div className={styles.aviso}>{mensaje}</div>}

      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.formTitle}>
          {editandoId ? "Editar producto" : "Agregar nuevo producto"}
        </h2>

        <div className={styles.grid}>
          <div className={styles.campo}>
            <label>Nombre *</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              placeholder="Ej: Labial Mate"
            />
            {errores.nombre && <span className={styles.err}>{errores.nombre}</span>}
          </div>

          <div className={styles.campo}>
            <label>Categoría</label>
            <input
              name="categoria"
              value={form.categoria}
              onChange={onChange}
              placeholder="Ej: Labios"
            />
          </div>

          <div className={styles.campo}>
            <label>Precio *</label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={onChange}
              placeholder="Ej: 12000"
              min="0"
            />
            {errores.precio && <span className={styles.err}>{errores.precio}</span>}
          </div>

          <div className={styles.campo}>
            <label>Stock *</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={onChange}
              placeholder="Ej: 15"
              min="0"
            />
            {errores.stock && <span className={styles.err}>{errores.stock}</span>}
          </div>

          <div className={styles.campo}>
            <label>Imagen (subir archivo)</label>
            <label className={styles.fileLabel}>
              <span className={styles.fileBtn}>Elegir archivo</span>
              <input
                type="file"
                accept="image/*"
                onChange={onChangeImagen}
                className={styles.fileInput}
              />
              <span className={styles.fileName}>
                {imagenFile
                  ? imagenFile.name
                  : form.imagen
                  ? "Imagen actual cargada"
                  : "Sin archivo seleccionado"}
              </span>
            </label>
            {(imagenFile || form.imagen) && (
              <img
                src={imagenFile ? URL.createObjectURL(imagenFile) : form.imagen}
                alt="Vista previa"
                className={styles.preview}
              />
            )}
          </div>

          <div className={`${styles.campo} ${styles.full}`}>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={onChange}
              rows={2}
              placeholder="Descripción del producto..."
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className="btn-primary" disabled={guardando}>
            <FiPlus /> {guardando ? "Guardando..." : editandoId ? "Guardar cambios" : "Agregar producto"}
          </button>
          {editandoId && (
            <button type="button" className="btn-ghost" onClick={resetear}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <section className={styles.tablaWrap}>
        <h2 className={styles.formTitle}>Catálogo ({productos.length})</h2>

        {cargando ? (
          <div className={styles.centro}>
            <div className="spinner" />
            <p>Cargando productos...</p>
          </div>
        ) : error ? (
          <p className={styles.errorBox}>{error}</p>
        ) : productos.length === 0 ? (
          <p className={styles.vacio}>No hay productos cargados todavía.</p>
        ) : (
          <div className={styles.tablaScroll}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.prodCell}>
                        {p.imagen ? (
                          <img src={p.imagen} alt={p.nombre} />
                        ) : (
                          <div className={styles.noImg} />
                        )}
                        <span>{p.nombre}</span>
                      </div>
                    </td>
                    <td>{p.categoria || "—"}</td>
                    <td>${Number(p.precio).toLocaleString("es-AR")}</td>
                    <td>{p.stock}</td>
                    <td>
                      <div className={styles.acciones}>
                        <button
                          className={styles.editBtn}
                          onClick={() => empezarEdicion(p)}
                          title="Editar"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className={styles.delBtn}
                          onClick={() => setAEliminar(p)}
                          title="Eliminar"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {aEliminar && (
        <div className={styles.modalOverlay} onClick={() => setAEliminar(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setAEliminar(null)}>
              <FiX />
            </button>
            <h3>¿Eliminar producto?</h3>
            <p>
              Vas a eliminar <strong>{aEliminar.nombre}</strong>. Esta acción no se
              puede deshacer.
            </p>
            <div className={styles.modalActions}>
              <button className="btn-ghost" onClick={() => setAEliminar(null)}>
                Cancelar
              </button>
              <button className={styles.confirmDel} onClick={confirmarEliminar}>
                <FiTrash2 /> Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
