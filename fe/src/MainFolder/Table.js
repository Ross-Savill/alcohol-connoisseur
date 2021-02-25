import React, { useState, useEffect, useMemo } from "react";
import { useTable, useFilters, useSortBy, usePagination, useBlockLayout } from "react-table";
import Select from 'react-select';
import '../Stylesheets/MainPageSS/Table.css'

export default function Table({ columns, data, drinkers }) {

  const [filterInput, setFilterInput] = useState("");
  const [drinkerSelection, setDrinkerSeletion] = useState([])
  const [selectedDrinker, setSelectedDrinker] = useState("")

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
    sortTypes: { sortAvg: useMemo(() => (a, b, id, desc) => {
      const rowA = a.original[id];
      const rowB = b.original[id];
      return rowA === rowB ? 0 : rowA > rowB || rowB === "-" ? 1 : -1;
    })},
    initialState: { pageSize: 50 }
  },
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout
  );

  useEffect(() => {
    let drinkerSelectionArray = [{"value": "", "label": "All Drinkers"}];
    drinkers.map((drinker) => {
      drinkerSelectionArray.push({"value": drinker.personName, "label": drinker.personName })
    })
    setDrinkerSeletion(drinkerSelectionArray)
  },[drinkers])

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("mainDrinkColumn", value);
    setFilterInput(value);
  };

  const handleChosenDrinkers = e => {
    const value = e.value || undefined;
    setFilter("name", value);
    setSelectedDrinker(value);
  };

  const paginationSection = () => {
    return(
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
  )
  }

  const tableIfPages = () => {
    if(pageCount === 0) {
      return <h1>No Data!</h1>
    } else {
      return (
            <table {...getTableProps()} className="MainPagetable">
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
    console.log(selectedDrinker)
    return (
      <div className="fullTableAndSearch">
        <div className="drinkSearchDiv">
          Search for a Drink:&nbsp;
          <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search Drink Name"}
          />
           &nbsp; by &nbsp;
          <Select
            className="mainTableDrinkerSelect"
            defaultValue={{"value": "", "label": "All Drinkers"}}
            options={drinkerSelection}
            onChange={handleChosenDrinkers}
          />
          &nbsp;
          {paginationSection()}
        </div>
        <div className="mainTableDiv">
          {tableIfPages()}
        </div>
        {paginationSection()}
      </div>
    );
  }
}