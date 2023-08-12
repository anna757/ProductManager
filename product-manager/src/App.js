import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import ProductDetails from './Components/ProductDetails'
import ProductForm from './Components/ProductForm'
import ProductList from './Components/ProductList'
import Search from './Components/Search'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/add' element={<ProductForm />} />
        <Route path='/products/:id/edit' element={<ProductForm />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
