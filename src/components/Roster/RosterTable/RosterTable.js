import React from "react";
import './RosterTable.css';
import {
  useTable
  , useSortBy
  , usePagination
  , useFilters


} from "react-table";

// Import multiple images from a folder





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


// Table function. It creates UI.

function Table({ columns, data }) {

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
    //footerGroups,
    //rows,
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
        className = "table"
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
                  //if first column
                  if (cell.column.id === 'columnId_00.27830976550007236') {
                    if (row.original["Image Available"] === "Yes") {
                      //console.log("Image Available");
                      //get player name
                      var playerName = row.original.name;
                      //get player image; 
                      //put dash between spaces in player name
                      var playerNameDash = playerName.replace(/\s/g, "-");
                      //remove any special characters
                      var playerNameDashNoSpecial = playerNameDash.replace(/[^a-zA-Z0-9-]/g, "");
                      // add path to player image
                      var playerImagePath = require("../../player_images/" + playerNameDashNoSpecial + ".png");
                      

                      return (
                        <td key="key"> 
                          <img src={playerImagePath} className = "player-icon" alt="Logo" />
                        </td>
                      )
                    }
                    else {
                      //console.log("No Image")
                      return (
                        <td key=""> No </td>
                      );
                    }
                  }
                  else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
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

//RosterTable with roster prop
function RosterTable({ roster }) {

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
        "accessor": "name"
      },
      {
        "id": "columnId_00.9080443947570558",
        "Header": "Team",
        "Footer": "",
        "accessor": "Key2",
        Filter: SelectColumnFilter,

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

  return (
    <Table columns={columns} data={roster} />
  );
}

export default RosterTable;