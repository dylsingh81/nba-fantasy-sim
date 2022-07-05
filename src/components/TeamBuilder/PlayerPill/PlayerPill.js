import React from 'react';
import './PlayerPill.css';

function PlayerPill(props) {

    var playerImagePath1 = require("../../../db/player_images/mystery.png");

    if (props.type === "starter") {
        return (
            <div className="player-starter-pill rounded-pill row align-items-center">
                <div className='col-md-1'>
                    <h3>{props.position}</h3>
                </div>
                <div className='col-md-3 line-sep'>
                    <img src={playerImagePath1} className="player-image" alt="NBA PLAYER" />
                </div>
                <div className='col-md-4'>
                    <h2>~Player Name~</h2>
                </div>
            </div>
        );
    }

    //if reserve
    if (props.type === "reserve"){
        return (
            <div className="player-reserve-pill rounded-pill row align-items-center">
                <div className='col-md-4'>
                    <img src={playerImagePath1} className="player-image" alt="NBA PLAYER" />
                </div>
                <div className='col-md-8'>
                    <h3>~Player Name~</h3>
                </div>
            </div>
        );
    }
    
}
export default PlayerPill;