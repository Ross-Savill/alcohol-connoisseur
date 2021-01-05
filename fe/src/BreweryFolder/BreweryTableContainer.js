import React, { Fragment } from "react"
import { useTable, useSortBy, useFilters, useExpanded } from "react-table";
import { Table } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import "../Stylesheets/BreweryTableContainer.css"

const BreweryTableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns
  } = useTable({
    columns,
    data,
    defaultColumn: { Filter: DefaultColumnFilter },
    initialState: {
      sortBy: [{ id: 'breweryTotalDrinksCount', desc: true }]
    }
  },
    useFilters,
    useSortBy,
    useExpanded
  )
  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  return (
    <Table bordered hover size="sm" variant="dark" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                <div {...column.getSortByToggleProps()}>
                  {column.render("Header")}
                  {generateSortingIndicator(column)}
                </div>
                <Filter column={column} />
            </th>
            ))}
          </tr>
        ))}
      </thead>
              {console.log(visibleColumns.length)}
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <Fragment key={row.getRowProps().key}>
              <tr>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
  )
}

export default BreweryTableContainer;