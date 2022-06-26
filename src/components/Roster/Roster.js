import React, { useState } from "react";
import './Roster.css';
import Papa from 'papaparse';
import rosterCSV from '../../db/roster_trimmed.csv';

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
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((player, index) => {
              return (
                <tr key={index}>
                  <td>{player[0]}</td>
                  <td>{player[1]}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
export default Roster;