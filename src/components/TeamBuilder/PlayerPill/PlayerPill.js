import React from 'react';
import './PlayerPill.css';

function PlayerPill(props) {
    console.log(props.player)
    var playerImagePath;
    

    if(props.player.playerid < 0) {
        playerImagePath = require("../../../db/player_images/mystery.png");

    }
    else{
        // Replace space in name with dash
        var playerName = props.player.name.replace(/\s/g, "-");
        playerImagePath = require("../../../db/player_images/" + playerName + ".png");
    }

    if (props.player.type === "starter") {
        return (
            <div className="player-starter-pill rounded-pill row align-items-center" onClick={props.handleShow}>
                <div className='col-md-1'>
                    <h3>{props.position}</h3>
                </div>
                <div className='col-md-3 line-sep'>
                    <img src={playerImagePath} className="player-image" alt="NBA PLAYER" />
                </div>
                <div className='col-md-4'>
                    <h2>~Player Name~</h2>
                </div>
            </div>
        );
    }

    //if reserve
    if (props.player.type === "reserve"){
        return (
            <div className="player-reserve-pill rounded-pill row align-items-center" onClick={props.handleShow}>
                <div className='col-md-4'>
                    <img src={playerImagePath} className="player-image" alt="NBA PLAYER" />
                </div>
                <div className='col-md-8'>
                    <h3>~Player Name~</h3>
                </div>
            </div>
        );
    }
    
}
export default PlayerPill;