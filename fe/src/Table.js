import React, { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

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
    usePagination
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("drinkMain", value);
    setFilterInput(value);
  };

  return (
    <>
    <form className="addDrinkForm">
      <div className="addDrinkForm">
        <p>Add a Drink:</p>
        <p>Person Name</p><input className="addDrinkForm" placeholder={"Name"}></input>
        <p>Main Drink Component</p><input className="addDrinkForm" placeholder={"Main Drink Component"}></input>
        <p>Drink Type</p><input placeholder={"Drink Type"}></input>
        <p>Brand or Brewery</p><input placeholder={"Brand or Brewery"}></input>
        <p>Mixer One</p><input placeholder={"Mixer One"}></input>
        <p>Mixer Two</p><input placeholder={"Mixer Two"}></input>
        <p>Garnish</p><input placeholder={"Garnish"}></input>
        <p>Rating Word One</p><input placeholder={"Rating Word One"}></input>
        <p>Rating Word Two</p><input placeholder={"Rating Word Two"}></input>
        <p>Score</p><input placeholder={"Score"}></input>
      </div>
    </form>

      <p>Search for a Drink:{' '}
        <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search Drink Name"}
        />
      </p>
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
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}