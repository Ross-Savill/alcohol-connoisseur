import React, { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination, useBlockLayout } from "react-table";
import './Stylesheets/Table.css'

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
    data,
    initialState: { pageSize: 50 }
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

  const tableIfPages = () => {
    if(pageCount === 0) {
      return <h1>No Data!</h1>
    } else {
    return (<table {...getTableProps()} className="MainPagetable">
          <thead>
          {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="th">
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
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
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
    )
      }
    }

  if(!data.length) {
    return <h1>HOLD YOUR HORSES ONE SEC...</h1>
  } else {
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
            {[50, 75, 100, 150, 200].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {tableIfPages()}
      </div>
    );
  }
}