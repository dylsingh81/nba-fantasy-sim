import React, { useState } from "react";
import './RosterTable.css';
import {
  useTable
  ,useSortBy
  ,usePagination
  ,useFilters
  
  
} from "react-table";

// From :
// https://akashmittal.com/gui-utility-to-generate-react-table-code/
// https://akashmittal.com/react-table-learn-filter-sort-pagination-in-10-minutes/

// Function for default filters
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
// Default filters function Ended


// Function for select filter
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
// Select filter function end



// Function for slider range filter
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <span>{filterValue || min}</span>{" "}
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}



// Slider filter function end

// Function for Min-Max range filter
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem"
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem"
        }}
      />
    </div>
  );
}
// Min-Max range filter function end



// Table function. It creates UI.

function Table({columns, data}) {
  
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  
  

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, },
    
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters,
    
    useSortBy,
    usePagination,
  );

  // Render the UI for your table
  return (
    <>
      
      <table
        {...getTableProps()}
        border={1}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          margin: "auto"
        }}
      >
        
        <thead>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : column.canSort
                          ? "⏺"
                          : ""}
                      </span>
                    </div>
                  
                  
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  
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
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        
      </table>
      
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      
    </>
  );
}

// App component start
function RosterTable() {

  // Columns array. This array contains your table headings and accessors which maps keys from data array
  const columns = React.useMemo(() => (
    [
      {
        "id": "columnId_00.27830976550007236",
        "Header": "IMAGE",
        "Footer": "",
        "accessor": "Key0",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        "id": "columnId_00.8366168306389434",
        "Header": "Name",
        "Footer": "",
        "accessor": "Key1"
      },
      {
        "id": "columnId_00.9080443947570558",
        "Header": "Team",
        "Footer": "",
        "accessor": "Key2",
        "filter": "includes"
      },
      {
        "id": "columnId_00.40874175307236293",
        "Header": "Position",
        "Footer": "",
        "accessor": "Key3",
        "filter": "includes"
      },
      {
        "id": "columnId_00.5762540192007892",
        "Header": "Overall",
        "Footer": "",
        "accessor": "Key4"
      },
      {
        "id": "columnId_00.8424649446053207",
        "Header": "3PT",
        "Footer": "",
        "accessor": "Key5",
        "filter": "includes"
      }
    ]
  ), []);

  // Data array. Replace it with your actual data.
  const data = React.useMemo(() => ([
    {
      "Key0": 1,
      "Key1": "Julian",
      "Key2": "Ms",
      "Key3": "Female",
      "Key4": 1997,
      "Key5": 1
    },
    {
      "Key0": 2,
      "Key1": "Ketti",
      "Key2": "Dr",
      "Key3": "Female",
      "Key4": 1990,
      "Key5": 4
    },
    {
      "Key0": 3,
      "Key1": "Fallon",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 1993,
      "Key5": 2
    },
    {
      "Key0": 4,
      "Key1": "Leela",
      "Key2": "Dr",
      "Key3": "Female",
      "Key4": 1991,
      "Key5": 5
    },
    {
      "Key0": 5,
      "Key1": "Vivienne",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 2004,
      "Key5": 2
    },
    {
      "Key0": 6,
      "Key1": "Margaux",
      "Key2": "Ms",
      "Key3": "Male",
      "Key4": 2002,
      "Key5": 3
    },
    {
      "Key0": 7,
      "Key1": "Mannie",
      "Key2": "Rev",
      "Key3": "Male",
      "Key4": 2011,
      "Key5": 3
    },
    {
      "Key0": 8,
      "Key1": "Vanya",
      "Key2": "Mrs",
      "Key3": "Female",
      "Key4": 2012,
      "Key5": 2
    },
    {
      "Key0": 9,
      "Key1": "Barbabra",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 2006,
      "Key5": 5
    },
    {
      "Key0": 10,
      "Key1": "Fiann",
      "Key2": "Mr",
      "Key3": "Female",
      "Key4": 2006,
      "Key5": 5
    },
    {
      "Key0": 11,
      "Key1": "Sargent",
      "Key2": "Ms",
      "Key3": "Female",
      "Key4": 1994,
      "Key5": 1
    },
    {
      "Key0": 12,
      "Key1": "Josy",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 2011,
      "Key5": 4
    },
    {
      "Key0": 13,
      "Key1": "Hulda",
      "Key2": "Honorable",
      "Key3": "Female",
      "Key4": 2010,
      "Key5": 2
    },
    {
      "Key0": 14,
      "Key1": "Giavani",
      "Key2": "Ms",
      "Key3": "Male",
      "Key4": 1993,
      "Key5": 2
    },
    {
      "Key0": 15,
      "Key1": "Berkley",
      "Key2": "Ms",
      "Key3": "Male",
      "Key4": 1999,
      "Key5": 2
    },
    {
      "Key0": 16,
      "Key1": "Nick",
      "Key2": "Honorable",
      "Key3": "Male",
      "Key4": 2005,
      "Key5": 5
    },
    {
      "Key0": 17,
      "Key1": "Angelina",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 1994,
      "Key5": 4
    },
    {
      "Key0": 18,
      "Key1": "Guglielmo",
      "Key2": "Honorable",
      "Key3": "Female",
      "Key4": 1986,
      "Key5": 3
    },
    {
      "Key0": 19,
      "Key1": "Myrtie",
      "Key2": "Mr",
      "Key3": "Female",
      "Key4": 2012,
      "Key5": 3
    },
    {
      "Key0": 20,
      "Key1": "Oates",
      "Key2": "Honorable",
      "Key3": "Male",
      "Key4": 1966,
      "Key5": 3
    },
    {
      "Key0": 21,
      "Key1": "Griswold",
      "Key2": "Rev",
      "Key3": "Male",
      "Key4": 1995,
      "Key5": 3
    },
    {
      "Key0": 22,
      "Key1": "Paxton",
      "Key2": "Rev",
      "Key3": "Male",
      "Key4": 1992,
      "Key5": 5
    },
    {
      "Key0": 23,
      "Key1": "Inesita",
      "Key2": "Mr",
      "Key3": "Male",
      "Key4": 1992,
      "Key5": 1
    },
    {
      "Key0": 24,
      "Key1": "Charleen",
      "Key2": "Honorable",
      "Key3": "Male",
      "Key4": 2003,
      "Key5": 4
    },
    {
      "Key0": 25,
      "Key1": "Rowland",
      "Key2": "Rev",
      "Key3": "Male",
      "Key4": 2010,
      "Key5": 4
    },
    {
      "Key0": 26,
      "Key1": "Trueman",
      "Key2": "Rev",
      "Key3": "Male",
      "Key4": 1994,
      "Key5": 3
    },
    {
      "Key0": 27,
      "Key1": "Mathilda",
      "Key2": "Rev",
      "Key3": "Male",
      "Key4": 2011,
      "Key5": 1
    },
    {
      "Key0": 28,
      "Key1": "Melloney",
      "Key2": "Honorable",
      "Key3": "Female",
      "Key4": 1995,
      "Key5": 2
    },
    {
      "Key0": 29,
      "Key1": "Inglis",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 1993,
      "Key5": 5
    },
    {
      "Key0": 30,
      "Key1": "Giustina",
      "Key2": "Mr",
      "Key3": "Male",
      "Key4": 1992,
      "Key5": 2
    },
    {
      "Key0": 31,
      "Key1": "Conrad",
      "Key2": "Mrs",
      "Key3": "Male",
      "Key4": 1989,
      "Key5": 5
    },
    {
      "Key0": 32,
      "Key1": "Emmalynne",
      "Key2": "Dr",
      "Key3": "Male",
      "Key4": 2004,
      "Key5": 4
    },
    {
      "Key0": 33,
      "Key1": "Jude",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 1992,
      "Key5": 3
    },
    {
      "Key0": 34,
      "Key1": "Farlee",
      "Key2": "Honorable",
      "Key3": "Male",
      "Key4": 2005,
      "Key5": 2
    },
    {
      "Key0": 35,
      "Key1": "Mendel",
      "Key2": "Honorable",
      "Key3": "Female",
      "Key4": 2010,
      "Key5": 5
    },
    {
      "Key0": 36,
      "Key1": "Fae",
      "Key2": "Dr",
      "Key3": "Female",
      "Key4": 1994,
      "Key5": 2
    },
    {
      "Key0": 37,
      "Key1": "Janella",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 1992,
      "Key5": 3
    },
    {
      "Key0": 38,
      "Key1": "Esmeralda",
      "Key2": "Ms",
      "Key3": "Male",
      "Key4": 1987,
      "Key5": 4
    },
    {
      "Key0": 39,
      "Key1": "Quintilla",
      "Key2": "Ms",
      "Key3": "Male",
      "Key4": 2008,
      "Key5": 3
    },
    {
      "Key0": 40,
      "Key1": "Devland",
      "Key2": "Rev",
      "Key3": "Female",
      "Key4": 2010,
      "Key5": 1
    },
    {
      "Key0": 41,
      "Key1": "Preston",
      "Key2": "Mrs",
      "Key3": "Male",
      "Key4": 2008,
      "Key5": 2
    },
    {
      "Key0": 42,
      "Key1": "Quintilla",
      "Key2": "Dr",
      "Key3": "Male",
      "Key4": 1993,
      "Key5": 1
    },
    {
      "Key0": 43,
      "Key1": "Minor",
      "Key2": "Mrs",
      "Key3": "Male",
      "Key4": 2010,
      "Key5": 1
    },
    {
      "Key0": 44,
      "Key1": "Jody",
      "Key2": "Mrs",
      "Key3": "Male",
      "Key4": 1985,
      "Key5": 5
    },
    {
      "Key0": 45,
      "Key1": "Shanda",
      "Key2": "Mr",
      "Key3": "Female",
      "Key4": 2004,
      "Key5": 2
    },
    {
      "Key0": 46,
      "Key1": "Sheelagh",
      "Key2": "Mrs",
      "Key3": "Male",
      "Key4": 2004,
      "Key5": 2
    },
    {
      "Key0": 47,
      "Key1": "Ester",
      "Key2": "Ms",
      "Key3": "Female",
      "Key4": 2004,
      "Key5": 1
    },
    {
      "Key0": 48,
      "Key1": "Anita",
      "Key2": "Rev",
      "Key3": "Male",
      "Key4": 2008,
      "Key5": 5
    },
    {
      "Key0": 49,
      "Key1": "Aurelea",
      "Key2": "Mr",
      "Key3": "Male",
      "Key4": 2003,
      "Key5": 3
    },
    {
      "Key0": 50,
      "Key1": "Aldis",
      "Key2": "Ms",
      "Key3": "Male",
      "Key4": 1996,
      "Key5": 3
    }
  ]), []);


  return (
    <Table columns={columns} data={data} />
  );
}
// App component end

export default RosterTable;