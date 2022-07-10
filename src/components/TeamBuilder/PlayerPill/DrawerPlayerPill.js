import React from 'react';
import './DrawerPlayerPill.css';

function DrawerPlayerPill(props) {
    var playerImagePath;
    
    if(props.player["Image Available"] === "no") {
        playerImagePath = require("../../../db/player_images/mystery.png");
    }
    else{
        // Replace space in name with dash
        var playerName = props.player.name.replace(/\s/g, "-");
        playerImagePath = require("../../../db/player_images/" + playerName + ".png");
    }

        return (
            <div className={"drawer-player-starter-pill rounded-pill row align-items-center bin_" + props.player.overall_bin} onClick={event => props.handlePlayerSet(event, props.player)}>
                
                <div className='col-md-4'>
                    <img src={playerImagePath} className="drawer-player-image" alt="NBA PLAYER" />
                </div>
                <div className='col-md-4'>
                    <h3>{props.player.name}</h3>
                </div>

                <div className='col-md-2 line-right'>
                    <h3>{props.player["overallAttribute"]}</h3>
                </div>

                <div className='col-md-2'>
                    <h3>{"$" + props.player["price"]}</h3>
                </div>
            </div>
        );
    
    
}
export default DrawerPlayerPill;