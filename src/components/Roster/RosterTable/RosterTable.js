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
  //const count = preFilteredRows.length;
  //console.log(filterValue, preFilteredRows, setFilter);
  return (
    <div className="input-group">
      <input
        className="default-filter form-control"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search...`}
      />
    </div>
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
    <div className="input-group">
      <select
        value={filterValue}
        className="form-select"
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
    </div>

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
      filterTypes,
      initialState: { pageSize: 10 },
      disableSortRemove: true,
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
        className="table table-hover table-striped cant-highlight table-bordered "
      >

        <thead className="align-middle">
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th {...column.getHeaderProps()}>

                  <div className="filter-header" {...column.getSortByToggleProps()}>
                    <span>{column.render("Header")}</span>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ⬇"
                          : " ⬆️"
                        : column.canSort
                          ? ""
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
                      //get player name
                      var playerName = row.original.name;
                      //Remove all special characters except period and space and dash
                      playerName = playerName.replace(/[^a-zA-Z0-9\s.-]/g, "");
                      // Replace space with dash
                      playerName = playerName.replace(/\s/g, "-");
                      // add path to player image
                      var playerImagePath = require("../../../db/player_images/" + playerName + ".png");


                      //get team name
                      var teamName = row.original.team;
                      var era = row.original.Era;

                      //Remove first 2 words if era is old
                      if (era === "Old") {
                        teamName = teamName.substring(teamName.indexOf(" ") + 1);
                        teamName = teamName.substring(teamName.indexOf(" ") + 1);
                      }

                      //Remove leading spaces
                      teamName = teamName.replace(/^\s+/g, "");
                      //Replace space with dash
                      teamName = teamName.replace(/\s/g, "-");

                      // add path to team image
                      var teamImagePath = require("../../../db/team_images/" + teamName + ".svg");



                      return (
                        <td key="key" className="align-middle">
                          <div className="text-center">
                            <div className="layered-container">
                              <div className="image-bottom-container">
                                <img className="image-bottom" src={playerImagePath} alt="" />
                              </div>

                              <img className="image-top" src={teamImagePath} data-src="" height="90" width="90" alt="Atlanta Hawks" title="Atlanta Hawks"></img>
                            </div>
                          </div>
                        </td>
                      )
                    }
                    else {
                      //console.log("No Image")
                      return (
                        <td key="" className="align-middle"> No </td>
                      );
                    }
                  }
                  else {
                    // Get column header id
                    var columnId = cell.column.id;
                    //console.log(columnId);
                    //Get name of column thats being sorted currently id

                    var columnsState = headerGroups[0];
                    //Loop through columns state and check if any column is sorted
                    for (var i = 0; i < columnsState.headers.length; i++) {
                      if (columnsState.headers[i].isSorted) {
                        //If column is sorted, get id of column
                        var sortedColumnId = columnsState.headers[i].id;
                        //console.log(sortedColumnId);
                      }
                    }

                    //console.log(sortedColumnId, columnId)
                    var sortedColClass = ""
                    if (sortedColumnId === columnId) {
                      //console.log("HERE")
                      sortedColClass = "sorted-cell "
                    }
                    return (

                      <td className={sortedColClass + "align-middle"} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>

      </table>

      <div className="pagination justify-content-end py-2">
        <button className="btn " onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button className="btn " onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button className="btn " onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="btn "
        >
          {">>"}
        </button>{" "}
        <span className="pt-2">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="pt-1 mx-2">
          | Go to page:{" "}
          <input
            type="number"
            className="btn btn-outline-dark"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          className="btn btn-outline-dark mx-2"
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
  //,Era,name,Image Available,team,Position,overallAttribute,closeShot,midRangeShot,threePointShot,freeThrow,shotIQ,offensiveConsistency,layup,standingDunk,drivingDunk,postHook,postFade,postControl,drawFoul,hands,interiorDefense,perimeterDefense,steal,block,lateralQuickness,helpDefenseIQ,passPerception,defensiveConsistency,speed,acceleration,strength,vertical,stamina,hustle,overallDurability,passAccuracy,ballHandle,speedWithBall,passIQ,passVision,offensiveRebound,defensiveRebound,overall_bin
  const columns = React.useMemo(() => (
    [
      {
        "id": "columnId_00.27830976550007236",
        "Footer": "",
        "accessor": "Key0",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        "id": "columnId_00.8366168306389434",
        "Header": "Name",
        "Footer": "",
        "accessor": "name",
        sortDescFirst: true
      },
      {
        "id": "columnId_00.9080443947570558",
        "Header": "Team",
        "Footer": "",
        "accessor": "team",
        Filter: SelectColumnFilter,
        sortDescFirst: true


      },
      {
        "id": "columnId_00.40874175307236293",
        "Header": "Position",
        "Footer": "",
        "accessor": "Position",
        "filter": "includes",
        sortDescFirst: true,
        Filter: SelectColumnFilter,

      },
      {
        "id": "columnId_00.5762540192007892",
        "Header": "Overall",
        "Footer": "",
        "accessor": "overallAttribute",
        sortDescFirst: true,
        disableFilters: true,

      },
      {
        "id": "columnId_00.8424649446053207",
        "Header": "Drive",
        "Footer": "",
        "accessor": "drive",
        sortDescFirst: true,
        disableFilters: true,


      },
      {
        "id": "columnId_00.898410086801098",
        "Header": "Mid Range",
        "Footer": "",
        "accessor": "midRange",
        sortDescFirst: true,
        disableFilters: true,

      },
      {
        "id": "columnId_00.898410086801099",
        "Header": "3Point",
        "Footer": "",
        "accessor": "threePoint",
        sortDescFirst: true,
        disableFilters: true,
      },
      {
        "id": "columnId_00.898410086801101",
        "Header": "Assist",
        "Footer": "",
        "accessor": "assist",
        disableFilters: true,
        sortDescFirst: true,
      },
      {
        "id": "columnId_00.898410086801102",
        "Header": "Rebound",
        "Footer": "",
        "accessor": "rebound",
        disableFilters: true,
        sortDescFirst: true,
      },
      {
        "id": "columnId_00.898410086801103",
        "Header": "On-Ball Defense",
        "Footer": "",
        "accessor": "onBallDefense",
        disableFilters: true,
        sortDescFirst: true,
      },
      {
        "id": "columnId_00.898410086801104",
        "Header": "Help Defense",
        "Footer": "",
        "accessor": "helpDefense",
        disableFilters: true,
        sortDescFirst: true,
      },
      {
        "id": "columnId_00.898410086801105",
        "Header": "Turnover",
        "Footer": "",
        "accessor": "turnover",
        disableFilters: true,
        sortDescFirst: true,
      },
      {
        "id": "columnId_00.898410086801106",
        "Header": "Free Throw",
        "Footer": "",
        "accessor": "freeThrow",
        disableFilters: true,
        sortDescFirst: true,
      },
    ]
  ), []);

  return (
    <Table columns={columns} data={roster} />
  );
}

export default RosterTable;
