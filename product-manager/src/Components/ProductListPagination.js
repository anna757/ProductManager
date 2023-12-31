import { TablePagination } from '@mui/material';
import { useProducts } from '../ProductContext';

/**
 * Renders a product pagination component
 * Allows the display of 10, 25, or a 100 products in the product list table
 * @param {object} products the products object
 */
const ProductListPagination = ({ products }) => {
    const { page, setPage, rowsPerPage, setRowsPerPage } = useProducts();

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    }

    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            width={'inherit'}
        />
    )
}

export default ProductListPagination;