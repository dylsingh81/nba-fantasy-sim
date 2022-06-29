import React, { useState } from "react";
import './Roster.css';
import Papa from 'papaparse';
import rosterCSV from '../../db/roster_trimmed.csv';
import RosterTable from "./RosterTable/RosterTable";

function Roster() {

  const [roster, setRoster] = useState([]);

  //Run command when enter page
  React.useEffect(() => {
    Papa.parse(rosterCSV, {
      download: true,
      dynamicTyping: true,
      header: true,
      complete: function (input) {
        const records = input.data;
        setRoster(records);
        console.log("Data Loaded")
      }
    });
  }
    , [])


  return (
    <div className='roster-mask'>
      <div>Historic Current All</div>
      <div className='roster-table'>
        <RosterTable roster={roster}></RosterTable>
      </div>
    </div>
  );
}
export default Roster;