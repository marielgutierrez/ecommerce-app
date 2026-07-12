import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const ADMIN_EMAILS = ["admin@aura.com"];

const esEmailAdmin = (email) =>
  ADMIN_EMAILS.map((e) => e.toLowerCase()).includes((email || "").toLowerCase());

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarPerfil = async (userFirebase) => {
    const ref = doc(db, "usuarios", userFirebase.uid);
    const snap = await getDoc(ref);
    let rol = esEmailAdmin(userFirebase.email) ? "admin" : "usuario";

    if (snap.exists()) {
      const data = snap.data();
      rol = esEmailAdmin(userFirebase.email) ? "admin" : data.rol || "usuario";
    } else {
      await setDoc(ref, {
        email: userFirebase.email,
        nombre: userFirebase.displayName || "",
        rol,
      });
    }

    return {
      uid: userFirebase.uid,
      email: userFirebase.email,
      nombre: userFirebase.displayName || "",
      rol,
    };
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (userFirebase) => {
      try {
        if (userFirebase) {
          const perfil = await cargarPerfil(userFirebase);
          setUsuario(perfil);
        } else {
          setUsuario(null);
        }
      } catch (e) {
        console.error("Error cargando el perfil:", e);
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    });
    return () => unsub();
  }, []);

  const registrar = async ({ nombre, email, password }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (nombre) await updateProfile(cred.user, { displayName: nombre });

    const rol = esEmailAdmin(email) ? "admin" : "usuario";
    await setDoc(doc(db, "usuarios", cred.user.uid), { email, nombre, rol });

    setUsuario({ uid: cred.user.uid, email, nombre, rol });
    return cred.user;
  };

  const login = async ({ email, password }) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const perfil = await cargarPerfil(cred.user);
    setUsuario(perfil);
    return cred.user;
  };

  const logout = () => signOut(auth);

  const value = {
    usuario,
    cargando,
    registrar,
    login,
    logout,
    estaLogueado: !!usuario,
    esAdmin: usuario?.rol === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
