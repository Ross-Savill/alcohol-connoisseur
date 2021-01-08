import React, { useState, Fragment } from "react"
import { useTable, useSortBy, useFilters, useExpanded } from "react-table";
import { Table } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import "../Stylesheets/BreweryTableContainer.css"
import { useMemo } from "react";

const BreweryTableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setSortBy,
    visibleColumns,
    allColumns,
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
      hiddenColumns: [ "breweryOwnDrinkCount", "breweryCollabDrinkCount", "breweryOwnDrinkAvgScore" ]
    }
  },
    useFilters,
    useSortBy,
    useExpanded,
  )

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
    <div className="mainTableAndChckboxes">
      <div className="additionalColumnsChckboxes">
        {<h4>Additional Columns</h4>}
        {allColumns.map(column =>
          {if(column.id === "breweryOwnDrinkCount") {
            return (
            <div className="additionalColumnChckbx" key={column.id}>
              <label>
                <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                Number of Drinks Without Collaborations
              </label>
            </div>
            )
          } else if(column.id === "breweryCollabDrinkCount") {
            return (
            <div className="additionalColumnChckbx" key={column.id}>
              <label>
                <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                Number of Drinks With Collaborations
              </label>
            </div>
            )
          } else if(column.id === "breweryOwnDrinkAvgScore") {
            return (
              <div className="additionalColumnChckbx" key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                  Drinks Score Excluding Collaborations
                </label>
              </div>
            )
          }}
        )}
        <br />
      </div>
      <div className="mainTable">
      <Table bordered hover size="sm" variant="dark" {...getTableProps()}>
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
                <tr {...row.getToggleRowExpandedProps()} >
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      <div className="expandedRowDiv">
                        {renderRowSubComponent(row)}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </Table>
    </div>
    </div>
  )
}

export default BreweryTableContainer;