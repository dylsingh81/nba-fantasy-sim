import React from 'react';
import PlayerPill from './PlayerPill/PlayerPill';
import './TeamBuilder.css';
//Import use state
import { useState } from "react";
import { Offcanvas } from 'react-bootstrap';

function TeamBuilder() {

  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Set players to an array of 8 empty objects
  
  const [playersArray, setplayersArray] = useState([]);
  //Set players array to 8 dicts with player id equal to -1, position equal to "", and type equal to "starter"
  for (let i = 0; i < 8; i++) {
    playersArray.push({
      playerid: -1,
      position: "",
      type: "starter",
      name: ""
    });
  }

  // Set final 3 of players array to type
  for (let i = playersArray.length-1; i > playersArray.length-4; i--) {
    playersArray[i].type = "reserve";
  }

  // Set first player in players array to name Jayson Tatum
  playersArray[0].name = "Jayson Tatum";
  playersArray[0].playerid = 0;

  return (
    <div className='team-mask'>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
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
            <PlayerPill position="PG" handleShow={handleShow} player={playersArray[0]}> </PlayerPill>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="SG" player={playersArray[1]}/>
          </div>
          <div className='col-md-4' id="first-reserve" >
            <PlayerPill player={playersArray[5]} />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="SF" player={playersArray[2]}/>
          </div>
          <div className='col-md-4'>
            <PlayerPill type="reserve" player={playersArray[6]}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="PF" player={playersArray[3]} />
          </div>
          <div className='col-md-4' id="last-reserve">
            <PlayerPill type="reserve" player={playersArray[7]}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="C" player={playersArray[4]}/>
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