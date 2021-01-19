import React, { useState, Fragment } from "react"
import { useTable, useSortBy, useFilters } from "react-table";
import { Table } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import "../Stylesheets/BreweryTable.css"
import { useMemo } from "react";

const BreweryTable = ({ columns, data, handleSetBrewery }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setSortBy,
    setHiddenColumns
  } = useTable({
    columns,
    data,
    defaultColumn: { Filter: DefaultColumnFilter },
    disableSortRemove: true,
    sortTypes: { sortAvgSolo: useMemo(() => (a, b, id, desc) => {
      const rowA = a.original[id];
      const rowB = b.original[id];
      return rowA === rowB ? 0 : rowA > rowB || rowB === "-" ? 1 : -1;
    })},
    initialState: {
      hiddenColumns: columns[0].columns.filter(column => !column.show).map(column => column.id)
    }
  },
    useFilters,
    useSortBy,
  )

  React.useEffect(
    () => {
      setHiddenColumns(
        columns[0].columns.filter(column => !column.show).map(column => column.id)
      );
    },
    [columns]
  );

  const [savedSortedColumn, setSavedSortedColumn] = useState("breweryTotalDrinksCount")
  const [sortedColumnDesc, setSortedColumnDesc] = useState(true)

  React.useEffect(() => {
    setSortBy([{ id: savedSortedColumn, desc: sortedColumnDesc }])
  },[data])

  const generateSortingIndicator = column => {
    if(column.isSorted && column.id !== savedSortedColumn) {
      setSavedSortedColumn(column.id)
    }
    if(column.isSorted && column.isSortedDesc !== sortedColumnDesc) {
      setSortedColumnDesc(column.isSortedDesc)
    }
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  return (
    <div className="mainTable">
      <Table bordered size="sm" hover {...getTableProps()}>
        <thead className="mainTableHeader">
          {headerGroups.map(headerGroup => (
            <tr className="topHeader" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="subHeaders"
                  {...column.getHeaderProps()}
                  {...column.getSortByToggleProps()}
                >
                  <div>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
               ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Fragment key={row.getRowProps().key}>
                <tr className="breweryTableRow" onClick={() => handleSetBrewery(row)}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                  })}
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default BreweryTable;