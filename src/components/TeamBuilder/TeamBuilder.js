import React from 'react';
import './TeamBuilder.css';

function TeamBuilder() {
  var playerName = "Aaron-Gordon";
  var playerImagePath1 = require("../../db/player_images/" + playerName + ".png");

  playerName = "Bill-Russell";
  var playerImagePath2 = require("../../db/player_images/" + playerName + ".png");

  return (
    <div className='mask'>
      <div class="container" id="team-container">
        <div class="row">
          <div class="col-md-11 pic-container">
            <img src={playerImagePath1} class="player-pic img-fluid"/>
          </div>
        </div>
        <div class="row">
        <div class="col-md-6 pic-container">
            <img src={playerImagePath1} class="player-pic img-fluid"/>
          </div>
          <div class="col-md-4 pic-container">
            <img src={playerImagePath1} class="player-pic img-fluid"/>
          </div>
        </div>
        <div class="row">
        <div class="col-md-7 pic-container">
            <img src={playerImagePath1} class="player-pic img-fluid"/>
          </div>
          <div class="col-md-1 pic-container">
            <img src={playerImagePath1} class="player-pic img-fluid"/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TeamBuilder;