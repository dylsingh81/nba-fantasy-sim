import React from 'react';
import PlayerPill from './PlayerPill/PlayerPill';
import './TeamBuilder.css';
//Import use state
import { useState } from "react";
import { Offcanvas } from 'react-bootstrap';
import DrawerPlayerPill from './PlayerPill/DrawerPlayerPill';
import Papa from 'papaparse';
import rosterCSV from '../../db/roster_adjusted_trimmed_salaries.csv';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function TeamBuilder() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [positionChoice, setPositionChoice] = useState("");
  const [pillChoice, setPillChoice] = useState(-1);
  const [roster, setRoster] = useState([]);
  const [drawerPills, setDrawerPills] = useState([]);
  const [playersArray, setplayersArray] = useState([]);
  const [teamName, setTeamName] = useState("Team Name");
  const [budget, setBudget] = useState(40);
  const [spentBudget, setSpentBudget] = useState(0);

  const [modalShow, modalSetShow] = useState(false);

  const modalHandleClose = () => modalSetShow(false);
  const modalHandleShow = () => modalSetShow(true);

  const handleDownloadTeam = () => {
    if(spentBudget > budget) {
      alert("You have exceeded your budget! Please adjust your team or change budget.");
    }
  }

  function handleShow(e, position, id) {
    setShow(true);

    setPillChoice(id);

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

  }

  function handlePlayerSet(e, player) {
    //Make copy of playersArray
    var newPlayersArray = [...playersArray];
    // Change player fields
    //console.log(newPlayersArray, pillChoice);
    newPlayersArray[pillChoice].name = player.name;
    newPlayersArray[pillChoice]["Image Available"] = player["Image Available"];
    newPlayersArray[pillChoice].price = player.price;
    newPlayersArray[pillChoice].overallAttribute = player.overallAttribute;
    newPlayersArray[pillChoice].isSelectedClass = "player-selected"
    newPlayersArray[pillChoice].isSelectedReserveClass = "reserve-selected"

    setplayersArray(newPlayersArray);
    //console.log(playersArray);
    setShow(false);

    //Set spentBudget to sum of all player prices
    setSpentBudget(playersArray.reduce((acc, curr) => acc + curr.price, 0));

  }

  //Set players array to 8 dicts with player id equal to -1, position equal to "", and type equal to "starter"
  if (playersArray.length < 8) {
    for (let i = 0; i < 8; i++) {
      playersArray.push({
        "Image Available": "no",
        position: "",
        type: "starter",
        price: 0,
      });
    }

    // Set final 3 of players array to type
    for (let i = playersArray.length - 1; i > playersArray.length - 4; i--) {
      playersArray[i].type = "reserve";
    }
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
        //console.log("Data Loaded", records);
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

      <Modal show={modalShow} onHide={modalHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Choose New Budget: </span>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </Modal.Body>
      </Modal>

      <span id="team-intro">
        <h3>Welcome to TeamBuilder!</h3>
        Click on the buttons to select players and Save/Download your team when done!
      </span>

      <div className='row mx-5 budget-header'>
        <div className='col-md-4'>
          <span className="">{"Budget Total:"}</span>
          <button onClick={modalHandleShow} className={"ms-2 btn btn-primary total-btn mb-1"}> {"$" + budget}</button>
        </div>

        <div className='col-md-4'>
          <span>{"Budget Spent: "}</span>
          <span className={"spentClass"}> {"$" + spentBudget}</span>
        </div>

        <div className='col-md-4'>
          <span>{"Budget Remaining: "}</span>
          <span className={"remainingClass"}> {"$" + (budget - spentBudget)}</span>
        </div>

      </div>

      <div className=" team-container">

        <div className='row pt-2'>
          <div className="col-md-4 offset-md-5">
            <div className="input-group input-group-lg row pt-2 team-name ">
              <input type="text" className="form-control" placeholder='Team Name' value={teamName} onChange={(e) => setTeamName(e.target.value)}></input>
            </div>
          </div>
        </div>


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
            <PlayerPill id={0} position="PG" handleShow={handleShow} player={playersArray[0]}> </PlayerPill>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill id={1} position="SG" handleShow={handleShow} player={playersArray[1]} />
          </div>
          <div className='col-md-4' id="first-reserve" >
            <PlayerPill id={5} player={playersArray[5]} handleShow={handleShow} />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill id={2} position="SF" handleShow={handleShow} player={playersArray[2]} />
          </div>
          <div className='col-md-4'>
            <PlayerPill id={6} type="reserve" handleShow={handleShow} player={playersArray[6]} />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill id={3} position="PF" handleShow={handleShow} player={playersArray[3]} />
          </div>
          <div className='col-md-4' id="last-reserve">
            <PlayerPill id={7} type="reserve" handleShow={handleShow} player={playersArray[7]} />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill id={4} position="C" handleShow={handleShow} player={playersArray[4]} />
          </div>

        </div>
      </div>


      <div className='row py-4 save-footer'>
        <div className='col-md-6'>
          <button onClick={handleDownloadTeam} className="btn btn-primary">Download Team</button>
        </div>
        <div className='col-md-6  '>
          <button className="btn btn-success">Save Team</button>
        </div>
      </div>

    </div>
  );
}
export default TeamBuilder;