import { useState } from 'react'
import './App.css';
import ItemListContainer from './components/ItemListContainer';
import { Layout } from './components/layout/Layout';
// import { Contador } from './components/EjemploUseEffect';
import FormularioContainer from './components/form/FormularioContainer';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <h1>Bienvenidos a mi página</h1>
        <p>Este es el contenido principal</p>
        <ItemListContainer Mensaje="Nuestros productos destacados"/>
        {/* <Contador/> */}
        {/* <FormularioContainer/> */}
      </Layout>
    </>
  );
}

export default App;
