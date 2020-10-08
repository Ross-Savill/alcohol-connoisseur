import React, { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination, useBlockLayout } from "react-table";
import './Table.css'

export default function Table({ columns, data }) {

  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    nextPage,
    previousPage,
    pageOptions,
    pageCount,
    canPreviousPage,
    canNextPage,
    setPageSize,
    prepareRow,
    setFilter,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data
  },
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("drinkMain", value);
    setFilterInput(value);
  };

  return (
    <div className="fullTableAndSearch">
      <div className="drinkSearchDiv">
        <p className="drinkSearchPtag">Search for a Drink:{' '}
          <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Search Drink Name"}
          />
        </p>
      </div>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[20, 40, 60, 80, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table {...getTableProps()} className="table">
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : "initial-column"
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="tr">
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className="td">
                    {cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}