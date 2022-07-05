import React from 'react';
import PlayerPill from './PlayerPill/PlayerPill';
import './TeamBuilder.css';

function TeamBuilder() {

  return (
    <div className='team-mask'>

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
            <PlayerPill position="PG" type="starter"> </PlayerPill>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="SG" type="starter"/>
          </div>
          <div className='col-md-4' id="first-reserve">
            <PlayerPill type="reserve"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="SF" type="starter"/>
          </div>
          <div className='col-md-4'>
            <PlayerPill type="reserve"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="PF" type="starter"/>
          </div>
          <div className='col-md-4' id="last-reserve">
            <PlayerPill type="reserve"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8 line-right'>
            <PlayerPill position="C" type="starter"/>
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