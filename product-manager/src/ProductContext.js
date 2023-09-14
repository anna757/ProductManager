import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productList from './data/products.json';

const ProductContext = createContext()

const ProductProvider = ({ children }) => {
    const navigate = useNavigate();

    // Product states
    const [products, setProducts] = useState(productList);
    const [idCounter, setIdCounter] = useState(products.length + 1);

    // Search states
    const [search, setSearch] = useState('');

    // Login States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'false';
    });

    // Login Check
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn.toString());
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn])

    // Categories for prduct list page
    const [category, setCategory] = useState('All');

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Preview Mode State
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    // Toggle
    const togglePreviewMode = () => {
        setIsPreviewMode(!isPreviewMode);
        if (isPreviewMode) navigate('/products');
        else navigate('/home');
    }

    // Image Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Product Form States
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('Digital Art');
    const [image, setImage] = useState('');
    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [imageError, setImageError] = useState('');

    // Reset Form 
    const resetForm = () => {
        setName('');
        setPrice('');
        setType('Digital Art');
        setImage('');
        setNameError('');
        setPriceError('');
        setImageError('');
    }

    // Add and delete products
    const addProduct = (name, price, type, image) => {
        const newProduct = {
            id: idCounter,
            name,
            price,
            type,
            image
        }
        setIdCounter(idCounter + 1);
        setProducts([...products, newProduct]);
    }

    const deleteProduct = (id) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
    }

    return (
        <ProductContext.Provider value={{
            username, setUsername,
            password, setPassword,
            isPreviewMode, setIsPreviewMode,
            togglePreviewMode,
            errorMessage, setError,
            products, setProducts,
            category, setCategory,
            addProduct,
            deleteProduct,
            page, setPage,
            rowsPerPage, setRowsPerPage,
            search, setSearch,
            isModalOpen, setIsModalOpen,
            name, setName,
            price, setPrice,
            type, setType,
            image, setImage,
            nameError, setNameError,
            priceError, setPriceError,
            imageError, setImageError,
            isLoggedIn, setIsLoggedIn,
            resetForm
        }}>
            {children}
        </ProductContext.Provider>
    )
}

const useProducts = () => useContext(ProductContext);
const usePagination = () => useContext(ProductContext);
const useSearch = () => useContext(ProductContext);
const useImageModal = () => useContext(ProductContext);
const useForm = () => useContext(ProductContext);
const useLogin = () => useContext(ProductContext);

export {
    ProductContext,
    ProductProvider,
    useProducts,
    usePagination,
    useSearch,
    useImageModal,
    useForm,
    useLogin
}