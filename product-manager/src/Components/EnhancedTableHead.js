import React, { useState } from 'react';
import { TableCell, Box, TableHead, TableRow, Typography } from '@mui/material';
import { useProducts } from '../ProductContext';
import TableSortLabel from '@mui/material/TableSortLabel';

const EnhancedTableHead = ({ columns, products }) => {
    const { setProducts } = useProducts();
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (field) => {
        if (field !== 'name' && field !== 'price' && field !== 'type') return;

        setSortField(field);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

        const sortedProducts = products.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });

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
                        <div>
                            <Typography
                                sx={{ py: 1, fontWeight: 'bold' }}
                                className='product-list--label'
                                variant='h6'>
                                {column.label}
                                {sortField === column.id}
                            </Typography>
                            {column.id === 'name' ||
                                column.id === 'price' ||
                                column.id === 'type' ? (
                                <TableSortLabel
                                    className="product-list--table-sort"
                                    active={sortField}
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