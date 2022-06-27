import React, { useState } from "react";
import './Roster.css';
import Papa from 'papaparse';
import rosterCSV from '../../db/roster_trimmed.csv';
import RosterTable from "./RosterTable/RosterTable";

var dataLoaded = false;

function Roster() {

  const [roster, setRoster] = useState([]);
  if(!dataLoaded){
    Papa.parse(rosterCSV, {
      download: true,
      header: true,
      complete: function (input) {
        const records = input.data;
        setRoster(records);
        console.log("Data Loaded")
        dataLoaded = true
      }
    });
  }
  

  return (
    <div className='roster-mask'>
      <div className='roster-table'>
        
        <RosterTable roster={roster}></RosterTable>

      </div>
    </div>
  );
}
export default Roster;