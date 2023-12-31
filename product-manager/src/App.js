import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import ProductDetails from './Pages/ProductDetails'
import ProductForm from './Pages/ProductForm'
import ProductList from './Pages/ProductList'
import HomePage from './Pages/HomePage'
import { ProductProvider } from './ProductContext';
import { StyledEngineProvider as StyleProvider } from '@mui/material/styles';
import Navbar from './Components/Navbar';
/**
 * Renders a product manager 
 * Style provider to override default mui styles with css
 * Product provider contains the states and context of the app
 */
const App = () => {
  return (
    <StyleProvider injectFirst>
      <Router>
        <ProductProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/add' element={<ProductForm />} />
            <Route path='/products/:id/edit' element={<ProductForm />} />
            <Route path='/products/:id' element={<ProductDetails />} />
          </Routes>
        </ProductProvider>
      </Router>
    </StyleProvider>

  );
}

export default App;
