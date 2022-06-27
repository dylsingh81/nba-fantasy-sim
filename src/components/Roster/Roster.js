import React, { useState } from "react";
import './Roster.css';
import Papa from 'papaparse';
import rosterCSV from '../../db/roster_trimmed.csv';
import RosterTable from "./RosterTable/RosterTable";

function Roster() {

  const [roster, setRoster] = useState([]);

  Papa.parse(rosterCSV, {
    download: true,
    complete: function (input) {
      const records = input.data;
      setRoster(records);
      console.log(roster)
    }
  });

  return (
    <div className='roster-mask'>
      <div className='roster-table'>
        
        <RosterTable></RosterTable>

      </div>
    </div>
  );
}
export default Roster;