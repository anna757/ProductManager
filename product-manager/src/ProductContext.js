import { createContext, useContext, useState } from 'react';
import productList from './data/products.json';

const ProductContext = createContext()

const ProductProvider = ({ children }) => {
    // Image Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Search states
    const [search, setSearch] = useState('');

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Product states
    const [products, setProducts] = useState(productList);
    const [idCounter, setIdCounter] = useState(products.length);

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
            products, setProducts, 
            addProduct, 
            deleteProduct,
            page, setPage,
            rowsPerPage, setRowsPerPage,
            search, setSearch,
            isModalOpen, setIsModalOpen }}>
            {children}
        </ProductContext.Provider>
    )
}

const useProducts = () => useContext(ProductContext);

const usePagination = () => useContext(ProductContext);

const useSearch = () => useContext(ProductContext);

const useImageModal = () => useContext(ProductContext);

export { 
    ProductContext, 
    ProductProvider, 
    useProducts, 
    usePagination, 
    useSearch, 
    useImageModal 
}