import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutaProtegida = ({ children, soloAdmin = false }) => {
  const { estaLogueado, esAdmin, cargando } = useAuth();

  if (cargando) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!estaLogueado) return <Navigate to="/login" replace />;
  if (soloAdmin && !esAdmin) return <Navigate to="/" replace />;

  return children;
};

export default RutaProtegida;
