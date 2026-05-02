import { useState } from 'react'
import './App.css';
import ItemListContainer from './components/ItemListContainer';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormularioContainer from './components/form/FormularioContainer';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={
                <>
                  <Home />
                  <ItemListContainer Mensaje="Nuestros productos destacados" />
                </>
            } />
            {/* <Route path="productos" element={<ItemListContainer Mensaje="Nuestros productos"/>} /> */}
            {/* <Route path="producto/:id" element={<ProductoDetalle />} />
            <Route path="carrito" element={<Carrito />} /> */}
          </Route>
        </Routes>
    </>
  );
}

      // <Layout>
      //   <ItemListContainer Mensaje="Nuestros productos destacados"/>
      //   {/* <FormularioContainer/> */}
      // </Layout>


export default App;
