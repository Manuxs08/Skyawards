import { createRoot } from 'react-dom/client'
import Inicio from './components/inicio/Inicio'
import Categoria from './components/categorias/Categoria'
import Nominado from './components/nominados/Nominado'
import Resultado from './components/resultados/Resultado'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/categoria' element={<Categoria/>}/>
      <Route path='/nominado' element={<Nominado/>}/>
      <Route path='/resultado' element={<Resultado/>}/>
    </Routes>
  </Router>
)
