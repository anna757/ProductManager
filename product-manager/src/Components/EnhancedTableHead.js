import React, { useState } from 'react';
import { TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useProducts } from '../ProductContext';
import TableSortLabel from '@mui/material/TableSortLabel';

/**
 * Renders EnhancedTableHead component which includes the table head for the product list
 * This table head includes sorting by name, price, and category
 * It can be done by ascending or descending order
 */
const EnhancedTableHead = ({ columns, products }) => {
    const { setProducts } = useProducts();
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (field) => {
        // Only apply sorting to name, price, and category
        if (field !== 'name' && field !== 'price' && field !== 'type') return;
        setSortField(field);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        // Sort by Ascending or descending order
        const sortedProducts = products.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        // Set the product list to the sorted products
        setProducts(sortedProducts);
    }


    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        sortDirection={sortField ? sortOrder : false}
                        key={column.id}
                        align={column.align}
                        onClick={() => handleSort(column.id)}>
                        {/* The product list table titles (Name, Price, Category...) */}
                        <div>
                            <Typography
                                sx={{ py: 1, fontWeight: 'bold' }}
                                className='product-list--label'
                                variant='h6'>
                                {column.label}
                            </Typography>
                            {column.id === 'name' ||
                                column.id === 'price' ||
                                column.id === 'type' ? (
                                <TableSortLabel
                                    className="product-list--table-sort"
                                    active={sortField === column.id}
                                    direction={sortOrder}
                                    onClick={() => handleSort(column.id)}
                                ></TableSortLabel>
                            ) : null}
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;