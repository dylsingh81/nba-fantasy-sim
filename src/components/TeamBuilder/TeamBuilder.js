import React from 'react';
import PlayerPill from './PlayerPill/PlayerPill';
import './TeamBuilder.css';
//Import use state
import { useState } from "react";
import { Offcanvas } from 'react-bootstrap';
import DrawerPlayerPill from './PlayerPill/DrawerPlayerPill';
import Papa from 'papaparse';
import rosterCSV from '../../db/roster_adjusted_trimmed.csv';

function TeamBuilder() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [positionChoice, setPositionChoice] = useState("");
  const [roster, setRoster] = useState([]);
  const [drawerPills, setDrawerPills] = useState([]);
  const [playersArray, setplayersArray] = useState([]);


  function handleShow(e, position) {
    setShow(true);
    if (position === undefined) {
      setPositionChoice("player:")
    }
    else {
      setPositionChoice(position + ": ");
    }

    //Filter array of players objects by position
    if (position === "PG" || position === "SG") {
      //If first letter is G
      setDrawerPills(roster.filter(player => player.Position.charAt(0) === ("G")));
    }
    else if (position === "SF" || position === "PF") {
      //If first letter is F
      setDrawerPills(roster.filter(player => player.Position.charAt(0) === ("F")));
    }
    else if (position === "C") {
      //If first letter is C
      setDrawerPills(roster.filter(player => player.Position.charAt(0) === ("C")));
    }
    else {
      setDrawerPills(roster);
    }

    /*
    if (position === "PG" || position === "SG") {
      setDrawerPills(roster.filter(player => player.Position.includes("G")));
    }
    if (position === "SF" || position === "PF") {
      setDrawerPills(roster.filter(player => player.Position.includes("F")));
    }
    if (position === "C") {
      setDrawerPills(roster.filter(player => player.Position.includes("C")));
    }*/

    //console.log(drawerPills);
  }

  function handlePlayerSet(e, player) {
    //Make copy of playersArray
    var newPlayersArray = [...playersArray];
    // Change player fields
    newPlayersArray[0].name = player.name;
    newPlayersArray[0]["Image Available"] = player["Image Available"];

    setplayersArray(newPlayersArray);
    //console.log(playersArray);
    setShow(false);
  }

  //Set players array to 8 dicts with player id equal to -1, position equal to "", and type equal to "starter"
  for (let i = 0; i < 8; i++) {
    playersArray.push({
      "Image Available": "no",
      position: "",
      type: "starter",
    });
  }

  // Set final 3 of players array to type
  for (let i = playersArray.length - 1; i > playersArray.length - 4; i--) {
    playersArray[i].type = "reserve";
  }

  //Run command when enter page
  React.useEffect(() => {
    Papa.parse(rosterCSV, {
      download: true,
      dynamicTyping: true,
      header: true,
      complete: function (input) {
        const records = input.data;
        setRoster(records);
        //console.log("Data Loaded")
      }
    });
  }
    , [])


  return (
    <div className='team-mask'>

      <Offcanvas show={show} onHide={handleClose} className="drawer">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h2>Choose a {positionChoice}</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {drawerPills.map(player => <DrawerPlayerPill player={player} key={player['Unique ID']} handlePlayerSet={handlePlayerSet} />)}
        </Offcanvas.Body>
      </Offcanvas>

      <span id="team-intro">
        <h3>Welcome to TeamBuilder!</h3>
        Click on the buttons to select players and Save/Download your team when done!
      </span>

      <div className='row mx-5 budget-header'>
        <div className='col-md-4'>
          <span>Budget Total:</span>
        </div>

        <div className='col-md-4'>
          <span>Budget Spent:</span>
        </div>

        <div className='col-md-4'>
          <span>Budget Remaining: </span>
        </div>

      </div>

      <div className=" team-container">
        <div className='row header'>
          <div className='col-md-8 line-right'>
            <h3>Starters</h3>
          </div>
          <div className='col-md-4'>
            <h3>Reserves</h3>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="PG" handleShow={handleShow} player={playersArray[0]} handlePlayerSet={handlePlayerSet}> </PlayerPill>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="SG" handleShow={handleShow} player={playersArray[1]} handlePlayerSet={handlePlayerSet} />
          </div>
          <div className='col-md-4' id="first-reserve" >
            <PlayerPill player={playersArray[5]} handleShow={handleShow} handlePlayerSet={handlePlayerSet} />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="SF" handleShow={handleShow} player={playersArray[2]} handlePlayerSet={handlePlayerSet}/>
          </div>
          <div className='col-md-4'>
            <PlayerPill type="reserve" handleShow={handleShow} player={playersArray[6]} handlePlayerSet={handlePlayerSet}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="PF" handleShow={handleShow} player={playersArray[3]} handlePlayerSet={handlePlayerSet}/>
          </div>
          <div className='col-md-4' id="last-reserve">
            <PlayerPill type="reserve" handleShow={handleShow} player={playersArray[7]} handlePlayerSet={handlePlayerSet}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="C" handleShow={handleShow} player={playersArray[4]} handlePlayerSet={handlePlayerSet}/>
          </div>

        </div>
      </div>


      <div className='row py-4 save-footer'>
        <div className='col-md-6'>
          <button className="btn btn-primary">Download Team</button>
        </div>
        <div className='col-md-6  '>
          <button className="btn btn-success">Save Team</button>
        </div>
      </div>

    </div>
  );
}
export default TeamBuilder;