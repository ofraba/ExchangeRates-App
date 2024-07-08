import React, { useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';

const ExchangeRateTable = ({ baseCurrency, exchangeRates }) => {
  //Transforms the exchangeRates object into an array of objects suitable for rendering in the table.
    const data = useMemo(
        () => Object.entries(exchangeRates).map(([Target, ExchangeRate]) => ({
            baseCurrency,
            Target,
            ExchangeRate,
        })),
        [exchangeRates, baseCurrency]
    );
//Defines an array of column configurations for the table
    const columns = useMemo(
        () => [
            {
                id: 'baseCurrency', // Unique id for the column
                Header: 'Base Currency',
                accessorKey: 'baseCurrency', 
                enableSorting: false, // Sorting is not necessary for this static column
            },
            {
                id: 'currency', // Unique id for the column
                Header: 'Target',
                accessorKey: 'Target',
                sortingFn: 'alphanumeric', // Sort type
            },
            {
                id: 'rate', // Unique id for the column
                Header: 'Exchange Rate',
                accessorKey: 'ExchangeRate',
                sortingFn: 'basic', // Explicitly specify sorting function for numbers
            },
        ],
        [baseCurrency]
    );
    
//Initializes a React Table instance 
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            sorting: [],
        },
    });

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.id !== 'baseCurrency' &&
                                    ({
                                        asc: ' 🔼',
                                        desc: ' 🔽',
                                    }[header.column.getIsSorted()] ?? ' 🔽')
                                }
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExchangeRateTable;
