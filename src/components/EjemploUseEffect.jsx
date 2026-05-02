import { useState, useEffect } from "react";

export function Contador() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("El componente se renderizó o el contador cambió.");
  }, [contador]); // 👈 depende del contador

  return (
    <div style={{ margin: "20px", padding: "15px", border: "1px solid black" }}>
      <h3>Ejemplo sencillo de useEffect</h3>
      <p>Valor actual: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Sumale 1</button>
      <button onClick={() => setContador(contador - 1)}>Restale 1</button>
    </div>
  );
}
