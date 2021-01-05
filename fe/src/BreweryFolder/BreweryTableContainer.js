import React from "react"
import { useTable, useSortBy } from "react-table";
import { Table } from 'reactstrap';

const BreweryTableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    sortTypes: React.useMemo(
      () => ({
        sortDrinkers: (rowA, rowB, id, desc) => {
          if (rowB.original[id].length > rowA.original[id].length) return -1;
          if (rowA.original[id].length > rowB.original[id].length) return 1;
          return 0;
        }
      }),
      []
    ),
  },
    useSortBy
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
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {generateSortingIndicator(column)}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default BreweryTableContainer;