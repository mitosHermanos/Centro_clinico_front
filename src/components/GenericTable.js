import React from 'react';
import { useTable, useSortBy, useFilters, usePagination} from 'react-table'  
import { Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';

function GenericTable({ columns, data, fetchData }) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  )
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,

      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize }
    } = useTable({
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 2 }
    },
    useFilters,
    useSortBy,
    usePagination
    ) 

    React.useEffect(() => {
      fetchData()
    }, [fetchData])
    

    function renderSelect(){
      return (            
        <InputGroup>              
            <InputGroup.Prepend>
              <InputGroup.Text>Show:</InputGroup.Text>
            </InputGroup.Prepend>
          <FormControl
            style={{width:"50%"}}
            as="select"
            value={pageSize}
            onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize} results
            </option>
            ))}
          </FormControl>    
        </InputGroup> 
      );
    }
  
    return (
      <Table {...getTableProps()} striped hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div style={{display: column.canFilter ? 'block' : 'flex', justifyContent:  column.canFilter ? null : 'space-between'}}>
                    <h4>{column.render('Header')}</h4>
                    <div>{column.canFilter ? column.render('Filter') : renderSelect()}</div>
                  </div>
                </th>      
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )}
          )}
        </tbody>
        <tfoot>
          <tr>
          <td>
          <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
            <InputGroup style={{width:"auto"}}>
              <InputGroup.Prepend>
                <InputGroup.Text>Go to page:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </InputGroup>                     
          </div>
          </td>
          {
          headerGroups.map((_, i) => {
            if(i < headerGroups.length-1)
              return <td key={i}></td>
          })}
          <td>
            <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
              <span style={{marginRight:"5%"}}>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>              
              <Pagination style={{marginBottom:"0px"}}>
                <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
                <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
                <Pagination.Next  onClick={() => nextPage()} disabled={!canNextPage}/>
                <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
              </Pagination>
            </div>	
          </td>
          </tr>
        </tfoot>        
      </Table>
    )
} export default GenericTable;


function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
      <FormControl style={{width:"50%"}}
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Search ${count} records...`}
      />
  )
}